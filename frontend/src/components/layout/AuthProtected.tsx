import { Outlet, useNavigate } from "react-router-dom";
import { authSelector, init } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import LoadingScreen from "../feedback/LoadingScreen";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", {
      replace: true,
    });
  }, []);

  return null;
};

const AuthProtected = () => {
  const { authStatus, authorization } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  if (authStatus === "idle" || authStatus === "pending") {
    return <LoadingScreen />;
  }

  if (authorization === "unauthenticated") {
    return <Redirect />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthProtected;
