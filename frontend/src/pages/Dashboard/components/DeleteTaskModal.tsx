"use client";

import { useEffect } from "react";
import { deleteTask, useTaskSelector } from "../../../store/slices/taskSlice";
import { useAppDispatch } from "../../../store/hooks";
import { toast } from "react-toastify";
import {
  fetchTasks,
  setTaskStatusToIdle,
} from "../../../store/slices/taskSlice";

interface ITask {
  id: number;
  user_id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface IDeleteTaskModal {
  currentTask: ITask;
  onClose: () => void;
}

const DeleteTaskModal = ({ currentTask, onClose }: IDeleteTaskModal) => {
  const dispatch = useAppDispatch();
  const { deleteTaskStatus } = useTaskSelector();

  useEffect(() => {
    if (deleteTaskStatus === "completed") {
      toast.success("Task deleted successfully");
      dispatch(fetchTasks());
      dispatch(setTaskStatusToIdle("delete"));
      onClose();
    }
  }, [deleteTaskStatus]);

  const handleDelete = () => {
    dispatch(deleteTask(currentTask.id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Task</h3>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">Do you want to delete this task?</p>

          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-400">
            <h4 className="font-semibold text-gray-900 mb-1">
              {currentTask.title}
            </h4>
            <p className="text-sm text-gray-600">{currentTask.description}</p>
          </div>

          <p className="text-sm text-red-600 mt-3">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            disabled={deleteTaskStatus === "pending"}
            onClick={onClose}
            type="button"
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            disabled={deleteTaskStatus === "pending"}
            onClick={handleDelete}
            type="button"
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteTaskStatus === "pending" ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
