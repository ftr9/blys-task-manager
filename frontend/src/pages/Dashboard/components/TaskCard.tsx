import { Edit, Trash2, CheckCircle, Clock, CircleDot } from "lucide-react";
import { formatDate, isAfter } from "date-fns";
import { useState } from "react";
import TaskModal from "./TaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import clsx from "clsx";

interface ITask {
  id: number;
  user_id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  end_date: string;
  created_at: string;
  updated_at: string;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "in_progress":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "todo":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "in_progress":
      return <CircleDot className="w-5 h-5 text-blue-500" />;
    case "todo":
    default:
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
};

const TASK_DESCRIPTION_LENGTH_THRESHOLD = 200;
const TaskCard = ({ task }: { task: ITask }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  const isOverdue =
    task.status !== "completed" && isAfter(new Date(), new Date(task.end_date));

  const isTaskDescriptionSizeExceeded =
    task.description.length > TASK_DESCRIPTION_LENGTH_THRESHOLD;

  const showMoreLessToggle = () => {
    setIsShowMore(!isShowMore);
  };

  return (
    <>
      <div
        className={`p-3 sm:p-6 hover:bg-gray-50 transition-colors ${
          isOverdue && "bg-red-50"
        }`}
      >
        <div
          className={clsx(
            "flex",
            "flex-col-reverse space-y-2 sm:flex-row sm: space-y-0 sm:items-start"
          )}
        >
          <div className="flex items-start space-x-4 flex-1">
            {getStatusIcon(task.status)}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-gray-900 mb-1 ${
                  task.status === "completed"
                    ? "line-through text-gray-500"
                    : ""
                }`}
              >
                {task.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {isShowMore
                  ? task.description
                  : task.description.slice(
                      0,
                      TASK_DESCRIPTION_LENGTH_THRESHOLD
                    )}
                &nbsp;
                {isTaskDescriptionSizeExceeded && !isShowMore && "...."}
                &nbsp;
                {isTaskDescriptionSizeExceeded && (
                  <span
                    onClick={showMoreLessToggle}
                    className="text-xs outline:none selection:none cursor-pointer hover:text-gray-500"
                  >
                    {isShowMore ? "show less" : "show more"}
                  </span>
                )}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status.replace("-", " ")}
                </span>
              </div>
              <p
                className={`text-xs mt-3 ${
                  isOverdue ? "text-red-600 font-semibold" : "text-gray-500"
                }`}
              >
                Due: {formatDate(task.end_date, "yyyy-MM-dd")} at{" "}
                {formatDate(task.end_date, "h:mm a")}{" "}
                {isOverdue && " (Overdue)"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 justify-end sm:justify-start">
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isUpdateModalOpen && (
        <TaskModal
          type="edit"
          onClose={() => setIsUpdateModalOpen(false)}
          currentTask={task}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteTaskModal
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          currentTask={task}
        />
      )}
    </>
  );
};

export default TaskCard;
