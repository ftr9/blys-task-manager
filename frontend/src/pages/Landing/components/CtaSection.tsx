import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();
  return (
    <section className="px-4 py-20 bg-gradient-to-r from-teal-500 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to boost your productivity?
        </h2>
        <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
          Join thousands of users who have transformed their workflow with
          TaskFlow.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-white hover:bg-gray-50 text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Get Started for Free
        </button>
      </div>
    </section>
  );
};

export default CtaSection;
