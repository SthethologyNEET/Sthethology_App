import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ name, email, password, confirmPassword, mobileNo, day, month, year, gender, studyingFor }) => {
    const success = handleInputErrors({ name, email, password, confirmPassword, mobileNo, day, month, year, gender, studyingFor });

    console.log(success);

    if (!success) return;

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword, mobileNo, day, month, year, gender, studyingFor })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      console.log(data);

      localStorage.setItem("users", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Signed up Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { loading, signup }
}

export default useSignup;

function handleInputErrors({ name, email, password, confirmPassword, mobileNo, day, month, year, gender, studyingFor }) {
  if (!name || !email || !password || !confirmPassword || !mobileNo || !day || !month || !year || !gender || !studyingFor) {
    toast.error("Please fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password should be atleast 6 characters long");
    return false;
  }

  if (mobileNo.length != 10) {
    toast.error("Enter a valid Mobile no.");
    return false;
  }

  return true;
}