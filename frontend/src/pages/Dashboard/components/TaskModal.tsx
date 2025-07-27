import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "date-fns";

import {
  createTask,
  updateTask,
  useTaskSelector,
  fetchTasks,
  setTaskStatusToIdle,
} from "../../../store/slices/taskSlice";
import { useAppDispatch } from "../../../store/hooks";
import { getDateTimeForDb } from "../../../utils/dateTime";
import { Tpriority, Tstatus, ITask } from "../../../types/task";
import { InfoIcon } from "lucide-react";
import Button from "../../../components/actions/Button";
import TextInput from "../../../components/dataInput/TextInput";
import SelectInput from "../../../components/dataInput/SelectInput";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../constants";

type IEditTaskModalProps =
  | {
      type: "edit";
      currentTask: ITask;
      onClose: () => void;
    }
  | {
      type: "create";
      currentTask: null;
      onClose: () => void;
    };

const defaultTaskData = {
  id: 0,
  title: "",
  description: "",
  priority: "low" as Tpriority,
  status: "pending" as Tstatus,
  end_date: new Date().toISOString(),
};

const TaskModal = ({ type, currentTask, onClose }: IEditTaskModalProps) => {
  const { id, title, description, priority, status, end_date } = currentTask
    ? currentTask
    : defaultTaskData;

  const [taskData, setTaskData] = useState({
    id,
    title,
    description,
    priority,
    status,
    end_date,
  });

  const dispatch = useAppDispatch();
  const { updateTaskStatus, createTaskStatus } = useTaskSelector();
  const isLoading =
    updateTaskStatus === "pending" || createTaskStatus === "pending";

  useEffect(() => {
    if (updateTaskStatus === "completed") {
      toast.success("updated task successfully");
      dispatch(fetchTasks());
      dispatch(setTaskStatusToIdle("update"));
      onClose();
    }

    if (createTaskStatus === "completed") {
      toast.success("created new task successfully");
      dispatch(fetchTasks());
      dispatch(setTaskStatusToIdle("create"));
      onClose();
    }
  }, [updateTaskStatus, createTaskStatus]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // If the time input changes, update the time part of end_date
    if (name === "time") {
      setTaskData((prev) => ({
        ...prev,
        end_date: getDateTimeForDb(taskData.end_date, value),
      }));
    } else {
      setTaskData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Time is not modified - modify the time to fit in database
    if (taskData.end_date === end_date) {
      const time = formatDate(new Date(taskData.end_date), "HH:mm");
      taskData.end_date = getDateTimeForDb(taskData.end_date, time);
    }

    if (type === "edit") {
      dispatch(updateTask(taskData));
      return;
    }

    dispatch(createTask(taskData));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {type === "edit" ? "Edit Task" : "Create Task"}
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <TextInput
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
              label="Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={taskData.description || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              rows={3}
              placeholder="Enter task description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <TextInput
                label="Due Date"
                onChange={handleChange}
                required
                type="date"
                name="end_date"
                value={formatDate(new Date(taskData.end_date), "yyyy-MM-dd")}
              />
            </div>
            <div>
              <TextInput
                label="Time"
                required
                type="time"
                name="time"
                onChange={handleChange}
                value={formatDate(new Date(taskData.end_date), "HH:mm")}
              />
            </div>
          </div>
          {type === "create" && (
            <div className="flex space-x-4 bg-yellow-100 p-3 rounded-md">
              <InfoIcon className="h-6 w-6 text-yellow-500" />
              <p className="text-xs">
                Avoid setting the time to the current time. Doing so may cause
                your task to be marked as overdue immediately.
              </p>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <SelectInput
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              options={PRIORITY_OPTIONS}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <SelectInput
              name="status"
              value={taskData.status}
              onChange={handleChange}
              options={STATUS_OPTIONS}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              disabled={isLoading}
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" loading={isLoading} disabled={isLoading}>
              {type === "edit" ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
