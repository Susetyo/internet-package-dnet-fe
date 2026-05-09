import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export function useRegisterMutation() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: register,
        onSuccess: (user) => {
            setUser(user);
            navigate("/dashboard");
        },
    });
}
