import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  DashboardHeader,
  TaskModal,
  EmptyTaskList,
  TaskFilters,
  TaskSkeletonLoader,
  TaskCard,
} from "./components";

import { Pagination } from "../../components";
import { useTaskSelector } from "../../store/slices/taskSlice";
import { fetchTasks } from "../../store/slices/taskSlice";
import { useAppDispatch } from "../../store/hooks";
import clsx from "clsx";

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useAppDispatch();
  const { fetchTaskStatus, tasks, query } = useTaskSelector();
  const isFetchingTask = fetchTaskStatus === "pending";

  useEffect(() => {
    const { sortBy, sortOrder, page } = query;

    const searchParams = new URLSearchParams();
    searchParams.set("sortBy", sortBy);
    searchParams.set("sortOrder", sortOrder);
    searchParams.set("page", `${page}`);

    dispatch(fetchTasks(`?${searchParams.toString()}`));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <DashboardHeader />

      <div className="max-w-[900px] mx-auto relative">
        <div className="p-3 sm:p-6">
          {/* Tasks List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="sticky top-0">
              <div
                className={clsx(
                  "p-6 border-b border-gray-100 sticky top-0 bg-white",
                  "flex flex-col space-y-3 p-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center sm:p-6"
                )}
              >
                <h2 className="text-xl font-bold text-gray-900">Tasks</h2>

                <div className="flex items-center gap-3 sm:w-[50%]">
                  <TaskFilters />
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full text-center text-sm bg-teal-500 hover:bg-teal-600 text-white py-2 px-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Plus className="w-5 h-5" />
                    <p className="text-center w-full">Add Task</p>
                  </button>
                </div>
              </div>
              <Pagination />
            </div>
            {isFetchingTask ? (
              <TaskSkeletonLoader />
            ) : (
              <div className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                {tasks.length === 0 && (
                  <EmptyTaskList
                    handleAddNewTask={() => setShowAddModal(true)}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {showAddModal && (
        <TaskModal
          currentTask={null}
          type="create"
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
