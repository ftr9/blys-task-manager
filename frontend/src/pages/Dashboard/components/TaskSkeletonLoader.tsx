const TaskSkeletonLoader = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Skeleton for multiple task items */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-3 border-y border-gray-50"
        >
          <div className="flex items-start justify-between">
            {/* Left side content */}
            <div className="flex items-start space-x-4 flex-1">
              {/* Icon placeholder */}
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse flex-shrink-0 mt-1"></div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Title placeholder */}
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>

                {/* Description placeholder */}
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>

                {/* Tags and date row */}
                <div className="flex items-center space-x-3 pt-2">
                  {/* Priority tag placeholder */}
                  <div className="h-7 w-16 bg-gray-200 rounded-full animate-pulse"></div>

                  {/* Status tag placeholder */}
                  <div className="h-7 w-20 bg-gray-200 rounded-full animate-pulse"></div>

                  {/* Due date placeholder */}
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right side action buttons */}
            <div className="flex items-center space-x-2 ml-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskSkeletonLoader;
