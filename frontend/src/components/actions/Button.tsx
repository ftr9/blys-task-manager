import { Loader } from "lucide-react";
import clsx from "clsx";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  loading?: boolean;
  variant?: "primary" | "outline";
}

const Button = (props: IButtonProps) => {
  const {
    children,
    loading,
    variant = "primary",
    disabled,
    className,
    ...allProps
  } = props;

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "w-full disabled:cursor-not-allowed disabled:bg-teal-600 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-[14px]",
        {
          "bg-teal-500 hover:bg-teal-600 text-white": variant === "primary",
          "text-gray-600 border border-gray-200 hover:bg-gray-50":
            variant === "outline",
        },
        className
      )}
      {...allProps}
    >
      {loading ? <Loader className="animate-spin mx-auto h-5 w-5" /> : children}
    </button>
  );
};

export default Button;
