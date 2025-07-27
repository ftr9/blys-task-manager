import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, User, Mail, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  authSelector,
  setRegisterStatusToIdle,
} from "../../store/slices/authSlice";
import { AppDispatch } from "../../store";
import Button from "../../components/actions/Button";
import TextInput from "../../components/dataInput/TextInput";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { registerStatus } = useSelector(authSelector);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect to dashboard after successful registration
  useEffect(() => {
    if (registerStatus === "resolved") {
      navigate("/dashboard", {
        replace: true,
      });
      dispatch(setRegisterStatusToIdle());
    }
  }, [registerStatus, navigate, setRegisterStatusToIdle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("password and confirmPassword must be same");
      return;
    }

    const { fullName, email, password } = formData;
    dispatch(
      register({
        name: fullName,
        email,
        password,
      })
    );
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
            Create Account
          </h1>
          <p className="text-gray-600">
            Sign up to get started with task management
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <TextInput
                label="Full Name"
                icon={<User className="h-5 w-5" />}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Enter your full name"
                value={formData.fullName}
              />
            </div>

            <div>
              <TextInput
                label="Email"
                icon={<Mail className="h-5 w-5" />}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                value={formData.email}
                type="email"
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
                placeholder="Create a password"
                value={formData.password}
              />
            </div>

            <div>
              <TextInput
                label="Confirm Password"
                icon={<Lock className="h-5 w-5" />}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                isPasswordField
                placeholder="Confirm your password"
                value={formData.confirmPassword}
              />
            </div>

            {formData.password !== formData.confirmPassword &&
              formData.confirmPassword && (
                <div className="text-red-500 text-sm">
                  * Passwords do not match
                </div>
              )}

            <Button loading={registerStatus === "pending"}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-500 hover:text-teal-600 font-medium"
              >
                Sign in
              </Link>
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

export default RegisterPage;
