import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main navigation', () => {
  render(<App />);
  const homeLink = screen.getByText(/главная/i);
  expect(homeLink).toBeInTheDocument();
});
