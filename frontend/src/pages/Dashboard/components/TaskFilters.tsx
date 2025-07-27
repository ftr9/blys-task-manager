import { useTaskSelector, setQuery } from "../../../store/slices/taskSlice";
import { useAppDispatch } from "../../../store/hooks";
import { SelectInput } from "../../../components";
import { SORT_OPTIONS } from "../../../constants";

const TaskFilter = () => {
  const { query } = useTaskSelector();
  const currentOptionValue = `${query.sortBy} ${query.sortOrder}`;
  const dispatch = useAppDispatch();

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value.split(" ");

    dispatch(
      setQuery({
        ...query,
        sortBy: sortValue[0] as "created_at" | "end_date" | "priority",
        sortOrder: sortValue[1] as "asc" | "desc",
      })
    );
  };

  return (
    <SelectInput
      value={currentOptionValue}
      onChange={handleSortByChange}
      options={SORT_OPTIONS}
    />
  );
};

export default TaskFilter;
