import { addToast } from '@heroui/toast';
import type { ToastProps } from '@heroui/toast';

export const showError = (props: Partial<ToastProps>) =>
    addToast({
        severity: 'danger',
        color: 'danger',
        ...props,
    });
