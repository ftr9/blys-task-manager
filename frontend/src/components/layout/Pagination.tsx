import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useTaskSelector, setQuery } from "../../store/slices/taskSlice";
import { useAppDispatch } from "../../store/hooks";
import clsx from "clsx";

//TODO: right now it's hard coded to tasks - this can be made resuable for other features was well
const Pagination = () => {
  const { tasks, query } = useTaskSelector();
  const dispatch = useAppDispatch();

  const leftPressHandle = () => {
    dispatch(
      setQuery({
        ...query,
        page: query.page - 1,
      })
    );
  };

  const rightPressHandle = () => {
    dispatch(
      setQuery({
        ...query,
        page: query.page + 1,
      })
    );
  };

  return (
    <div
      className={clsx("px-3 py-4 border-b border-gray-100 bg-white", "sm:px-6")}
    >
      <div className="flex  justify-end">
        <div className="flex items-center space-x-2">
          <button
            onClick={leftPressHandle}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors bg-teal-500 text-white`}
          >
            {query.page}
          </button>

          <button
            disabled={query.limit > tasks.length}
            onClick={rightPressHandle}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
