import { Routes, Route, Navigate } from "react-router-dom";
import { Landing, Login, Register, Dashboard } from "./pages";

import AuthProtected from "./components/layout/AuthProtected";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AuthProtected />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default App;
