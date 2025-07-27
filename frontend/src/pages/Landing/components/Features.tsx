import { CheckCircle, Calendar, Zap } from "lucide-react";

const Features = () => {
  return (
    <section className="px-4 py-20 bg-gradient-to-r from-gray-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Everything you need to stay productive
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Powerful features designed to help you organize, prioritize, and
          complete your tasks efficiently.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Smart Organization
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Organize tasks with priorities, due dates, and custom statuses.
              Never lose track of what matters most.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <Calendar className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Timeline Management
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Set deadlines, track progress, and get insights into your
              productivity patterns over time.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
              <Zap className="w-10 h-10 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Quick task creation, instant search, and smooth interactions.
              Built for speed and efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
