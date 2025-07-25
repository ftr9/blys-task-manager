import { EyeOff, Eye } from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";

interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  isPasswordField?: boolean;
  icon?: React.ReactNode;
}
const TextInput = ({
  isPasswordField = false,
  onChange,
  placeholder,
  icon,
  ...props
}: ITextInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}

      {isPasswordField ? (
        <input
          type={showPassword ? "text" : "password"}
          required
          onChange={onChange}
          className={clsx(
            "w-full pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all",
            icon ? "pl-11" : "pl-3"
          )}
          placeholder={placeholder}
          {...props}
        />
      ) : (
        <input
          type={"text"}
          required
          onChange={onChange}
          className={clsx(
            "w-full pl-11 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all",
            icon ? "pl-11" : "pl-3"
          )}
          placeholder={placeholder}
          {...props}
        />
      )}

      {isPasswordField && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default TextInput;
