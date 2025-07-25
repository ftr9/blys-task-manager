import React from 'react';
import { CheckCircle, Calendar, Zap, Plus } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">TaskFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('login')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate('register')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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
              onClick={() => onNavigate('register')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Start Managing Tasks
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="text-gray-700 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors border-2 border-gray-200 hover:border-gray-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-gray-50 to-slate-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Everything you need to stay productive
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Powerful features designed to help you organize, prioritize, and complete
            your tasks efficiently.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Organization</h3>
              <p className="text-gray-600 leading-relaxed">
                Organize tasks with priorities, due dates, and custom statuses. Never lose track of 
                what matters most.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Calendar className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeline Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Set deadlines, track progress, and get insights into your productivity patterns 
                over time.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-10 h-10 text-violet-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick task creation, instant search, and smooth interactions. Built for speed 
                and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who have transformed their workflow with TaskFlow.
          </p>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-white hover:bg-gray-50 text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            Get Started for Free
          </button>
        </div>
      </section>
    </div>
  );
}