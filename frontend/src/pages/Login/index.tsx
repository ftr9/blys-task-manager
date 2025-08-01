import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail, Lock } from "lucide-react";
import Button from "../../components/actions/Button";
import TextInput from "../../components/dataInput/TextInput";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  authSelector,
  login,
  setRegisterStatusToIdle,
} from "../../store/slices/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { registerStatus } = useAppSelector(authSelector);

  useEffect(() => {
    if (registerStatus === "resolved") {
      navigate("/dashboard", {
        replace: true,
      });
      dispatch(setRegisterStatusToIdle());
    }
  }, [registerStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">TaskFlow</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue managing your tasks
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <TextInput
                label="Email"
                icon={<Mail className="h-5 w-5" />}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                value={formData.email}
              />
            </div>

            <div>
              <TextInput
                label="Password"
                icon={<Lock className="h-5 w-5" />}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                isPasswordField
                placeholder="Enter your password"
                value={formData.password}
              />
            </div>
            <Button loading={registerStatus === "pending"}>Sign In</Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
