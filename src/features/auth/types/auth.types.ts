export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'customer';
    customerId?: string;
};

export type LoginPayload = { email: string; password: string };

export type RegisterPayload = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

export type ForgotPasswordPayload = {
    email: string;
    password: string;
};
