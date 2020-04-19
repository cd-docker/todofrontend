import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders a link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Continuous Delivery using Docker/i);
  expect(linkElement).toBeInTheDocument();
});
