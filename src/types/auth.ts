export interface AuthFormData {
    email: string;
    password: string;
    username?: string;
}

export interface AuthFormProps {
    onSubmit: (data: AuthFormData) => void;
    isLoading?: boolean;
    error?: string;
}

export type AuthFormMode = 'login' | 'register';
