import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("users");
            setAuthUser(null);
            toast.success("Logged out Successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return { loading, logout };
}

export default useLogout;