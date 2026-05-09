import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { useAuthStore } from "../store/auth.store";

export function useLoginMutation() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            setUser(user);
            navigate("/dashboard");
        },
    });
}
