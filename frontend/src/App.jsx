import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./pages/Courses";
import Signup from "./pages/auth/signup/Signup";
import Login from "./pages/auth/login/Login";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={authUser ? <Courses /> : <Navigate to={"/signup"} />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
