import { CheckCircle, Loader } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 ">
          <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-bold text-gray-900">TaskFlow</span>
        </div>
        <div className="mt-5 space-y-2 animate-pulse">
          <p>please wait</p>
          <Loader className="animate-spin mx-auto h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
