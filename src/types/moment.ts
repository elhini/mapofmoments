export interface MomentFormData {
    title: string;
    description?: string;
}

export interface MomentFormProps {
    onSubmit: (data: MomentFormData) => void;
    isLoading?: boolean;
    error?: string;
}

export type MomentFormMode = 'create' | 'update';
