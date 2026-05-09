import { api } from "../../../shared/api/axios-conf";
import type { User } from "../../auth/types/auth.types";

export type CreateCustomerUserPayload = {
    name: string;
    email: string;
    password: string;
    customerId: string;
};

export type UpdateCustomerUserPayload = {
    name: string;
    email: string;
    password?: string;
};

export const usersApi = {
    getAll: async () => (await api.get<User[]>("/users")).data,
    getByEmail: async (email: string) =>
        (await api.get<User[]>(`/users?email=${encodeURIComponent(email)}`))
            .data,
    createCustomer: async (payload: CreateCustomerUserPayload) =>
        (
            await api.post<User>("/users", {
                id: String(Date.now()),
                name: payload.name,
                email: payload.email,
                password: payload.password,
                role: "customer",
                customerId: payload.customerId,
            })
        ).data,
    updateCustomer: async (id: string, payload: UpdateCustomerUserPayload) =>
        (
            await api.patch<User>(`/users/${id}`, {
                name: payload.name,
                email: payload.email,
                ...(payload.password ? { password: payload.password } : {}),
            })
        ).data,
    remove: async (id: string) => (await api.delete(`/users/${id}`)).data,
};
