import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import App from './App';

it('Should have welcome text', () => {
    render (<App />);
    const message = screen.queryByText(/welcome/i);
    expect(message).toBeVisible();
});

describe('Redux hooks', () => {
    it('Should import useDispatch and useSelector', () => {
      expect(typeof useDispatch).toBe('function');
      expect(typeof useSelector).toBe('function');
    });
  });

describe('App Component', () => {
  it('Should import useEffect', () => {
    expect(typeof useEffect).toBe('function');
  });
});

it('Should have buttons for Movies and TV Shows', () => {
    render(<App />);
    const moviesButton = screen.getByRole('button', { name: /movies/i });
    const tvShowsButton = screen.getByRole('button', { name: /tv shows/i });

    expect(moviesButton).toBeInTheDocument();
    expect(tvShowsButton).toBeInTheDocument();
});

it('Should have an input element', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/search for your favorite movie or tv show/i);
    expect(inputElement).toBeInTheDocument();
});
