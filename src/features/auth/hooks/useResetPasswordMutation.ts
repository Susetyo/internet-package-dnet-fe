import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/auth.api";

type UseResetPasswordMutationParams = {
    onSuccess?: () => void;
};

export function useResetPasswordMutation({
    onSuccess,
}: UseResetPasswordMutationParams = {}) {
    return useMutation({
        mutationFn: resetPassword,
        onSuccess,
    });
}
