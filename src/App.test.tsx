import { render, screen } from '@testing-library/react';
import App from './App';

it('Should have welcome text', () => {
    render (<App />);
    const message = screen.queryByText(/welcome/i);
    expect(message).toBeVisible();
})