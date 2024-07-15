import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import scrollToTop from "../utils/scrollToTop";

const useLogin = () => {
    const [loading, setIsLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({ email, password }) => {
        const success = handleInputErrors({ email, password });
        if (!success) return;

        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("users", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Logged in Successfully");
        } catch (error) {
            toast.error(error.message);
            scrollToTop();
        } finally {
            setIsLoading(false);
        }
    }
    return { loading, login };
}

export default useLogin;

function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill all the fields");
        scrollToTop();
        return false;
    }
    return true;
}