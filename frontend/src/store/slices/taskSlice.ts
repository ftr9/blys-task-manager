import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { RootState } from "..";
import { performApiAction } from "../../services/api";
import { ITask, IQuery } from "../../types";

interface IInitialTaskState {
  tasks: ITask[];
  query: IQuery;

  fetchTaskStatus: "idle" | "pending" | "completed";
  updateTaskStatus: "idle" | "pending" | "completed";
  deleteTaskStatus: "idle" | "pending" | "completed";
  createTaskStatus: "idle" | "pending" | "completed";
}

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (queryParams: string | undefined, { rejectWithValue }) => {
    const response = await performApiAction({
      method: "GET",
      url: `/tasks${queryParams ?? ""}`,
      requiresAuth: true,
    });

    if (!response.success) {
      return rejectWithValue(response.error);
    }

    return response.data as { tasks: ITask[] };
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (data: Partial<ITask>, { rejectWithValue }) => {
    const response = await performApiAction({
      method: "PUT",
      url: `/tasks/${data.id}`,
      body: { ...data, endDate: data.end_date },
      requiresAuth: true,
    });

    if (!response.success) {
      return rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: number, { rejectWithValue }) => {
    const response = await performApiAction({
      method: "DELETE",
      url: `tasks/${id}`,
      requiresAuth: true,
    });

    if (!response.success) {
      rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload: Partial<ITask>, { rejectWithValue }) => {
    const createResponse = await performApiAction({
      method: "POST",
      url: "/tasks",
      body: { ...payload, endDate: payload.end_date },
      requiresAuth: true,
    });

    if (!createResponse.success) {
      return rejectWithValue(createResponse.error);
    }

    return createResponse.data as ITask;
  }
);

const initialTaskState: IInitialTaskState = {
  tasks: [],
  query: {
    page: 1,
    limit: 10,
    sortBy: "end_date",
    sortOrder: "desc",
  },
  fetchTaskStatus: "idle",
  updateTaskStatus: "idle",
  deleteTaskStatus: "idle",
  createTaskStatus: "idle",
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialTaskState,
  reducers: {
    setTaskStatusToIdle: (
      state,
      action: PayloadAction<"update" | "delete" | "create">
    ) => {
      if (action.payload === "create") state.createTaskStatus = "idle";
      if (action.payload === "update") state.updateTaskStatus = "idle";
      if (action.payload === "delete") state.deleteTaskStatus = "idle";
    },
    setQuery: (state, action: PayloadAction<IQuery>) => {
      if (action.payload.page < 1) {
        return;
      }
      state.query = { ...action.payload };
    },
  },

  extraReducers(builder) {
    //fetch task
    builder.addCase(fetchTasks.pending, (state) => {
      state.fetchTaskStatus = "pending";
    });

    builder.addCase(fetchTasks.rejected, (state) => {
      state.fetchTaskStatus = "idle";
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.fetchTaskStatus = "completed";
      state.tasks = action.payload.tasks;
    });

    //create
    builder.addCase(createTask.pending, (state) => {
      state.createTaskStatus = "pending";
    });

    builder.addCase(createTask.fulfilled, (state) => {
      state.createTaskStatus = "completed";
    });

    builder.addCase(createTask.rejected, (state) => {
      state.createTaskStatus = "idle";
    });

    //update
    builder.addCase(updateTask.pending, (state) => {
      state.updateTaskStatus = "pending";
    });

    builder.addCase(updateTask.rejected, (state) => {
      state.updateTaskStatus = "idle";
    });

    builder.addCase(updateTask.fulfilled, (state) => {
      state.updateTaskStatus = "completed";
    });

    //delete
    builder.addCase(deleteTask.pending, (state) => {
      state.deleteTaskStatus = "pending";
    });

    builder.addCase(deleteTask.fulfilled, (state) => {
      state.deleteTaskStatus = "completed";
    });

    builder.addCase(deleteTask.rejected, (state) => {
      state.deleteTaskStatus = "idle";
    });
  },
});

export const { setTaskStatusToIdle, setQuery } = taskSlice.actions;
export const useTaskSelector = () =>
  useAppSelector((state: RootState) => state.task);
export default taskSlice.reducer;
