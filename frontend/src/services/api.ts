import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface IPerformApiActionProps {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  body?: Record<string, any>;
  showToastMessage?: boolean;
  requiresAuth: boolean;
}

export interface IError {
  status: "fail";
  message: string;
  statusText: string;
}

const API = axios.create({
  baseURL: "/api",
});

type TResponse<TData> =
  | { success: true; data: TData; error: null }
  | { success: false; data: null; error: TData };

export const performApiAction = async <TData>({
  method,
  url,
  body,
  showToastMessage = true,
  requiresAuth,
}: IPerformApiActionProps) => {
  //attach the token if request requires authenticated users
  if (requiresAuth) {
    API.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("TM_ACCESS_KEY");
      if (!accessToken) return config;
      config["headers"]["Authorization"] = `Bearer ${accessToken}`;
      return config;
    });
  }

  try {
    let response: any;

    switch (method) {
      case "GET":
        response = await API.get(url, body);
        return {
          success: true,
          data: response.data?.data as TData,
          error: null,
        } as TResponse<TData>;

      case "POST":
        response = await API.post(url, body);
        return {
          success: true,
          data: response.data?.data as TData,
          error: null,
        } as TResponse<TData>;

      case "PUT":
        response = await API.put(url, body);
        return {
          success: true,
          data: response.data?.data as TData,
          error: null,
        } as TResponse<TData>;

      case "PATCH":
        response = await API.patch(url, body);
        return {
          success: true,
          data: response.data?.data as TData,
          error: null,
        } as TResponse<TData>;

      case "DELETE":
        response = await API.delete(url, body);
        return {
          success: true,
          data: response.data?.data as TData,
          error: null,
        } as TResponse<TData>;

      default: {
        throw new Error("Please provide a valid http method");
      }
    }
  } catch (err) {
    let apiError: IError = {
      status: "fail",
      message: "something went wrong",
      statusText: "none",
    };

    //if api error get the error sent from backend
    if (err instanceof AxiosError && err.response?.data) {
      apiError = {
        ...apiError,
        ...err.response.data,
        statusText: err.response.statusText,
      };
    }

    if (showToastMessage) {
      toast.error(apiError.message);
    }

    //something went wrong
    return {
      success: false,
      data: null,
      error: apiError,
    } as TResponse<IError>;
  }
};
