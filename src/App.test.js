import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const headerElement = screen.getByText(/Add your journey/i);
  expect(headerElement).toBeInTheDocument();
});
