import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Manage Tasks
          <span className="text-teal-500 block">Like a Pro</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stay organized, boost productivity, and never miss a deadline with our
          beautiful and intuitive task management platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Start Managing Tasks
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-700 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors border-2 border-gray-200 hover:border-gray-300"
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
