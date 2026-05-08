export type User = {
    id: string;
    name: string;
    email: string;
    password?: string; role: 'admin' | 'customer'
};

export type LoginPayload = { email: string; password: string };
