export type AuthFormData = {
    email: string;
    password: string;
    username: string;
};

export type AuthFormProps = {
    onSubmit: (data: AuthFormData) => void;
    isLoading?: boolean;
    error?: string;
};

export type AuthFormMode = 'login' | 'register';
