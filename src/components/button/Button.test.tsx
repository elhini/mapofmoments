import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
    it('should render the button with children', () => {
        render(<Button>Click me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it('should be disabled and show a spinner when isLoading prop is true', () => {
        render(<Button isLoading>Click me</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
        expect(buttonElement.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });
});
