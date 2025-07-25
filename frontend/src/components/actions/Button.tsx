import { Loader } from "lucide-react";

const Button = ({
  children,
  loading = false,
  disabled = false,
}: {
  children: string;
  loading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled || loading}
      type="submit"
      className="w-full disabled:cursor-not-allowed disabled:bg-teal-600 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-[14px]"
    >
      {loading ? <Loader className="animate-spin mx-auto h-5 w-5" /> : children}
    </button>
  );
};

export default Button;
