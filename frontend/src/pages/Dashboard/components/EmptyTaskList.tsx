import { Circle } from "lucide-react";

interface IEmptyTaskListProps {
  handleAddNewTask: () => void;
}

const EmptyTaskList = ({ handleAddNewTask }: IEmptyTaskListProps) => {
  return (
    <div className="p-12 text-center">
      <Circle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
      <p className="text-gray-500 mb-4">
        Get started by creating your first task.
      </p>

      <button
        onClick={handleAddNewTask}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        Add Your First Task
      </button>
    </div>
  );
};

export default EmptyTaskList;
