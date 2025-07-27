import clsx from "clsx";

interface IOptions {
  title: string;
  value: string;
}

interface ISelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: IOptions[];
}

const SelectInput = (props: ISelectInputProps) => {
  const { className, options, ...allProps } = props;

  return (
    <select
      className={clsx(
        "w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent",
        className
      )}
      {...allProps}
    >
      {options.map((option) => (
        <option key={option.title} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
