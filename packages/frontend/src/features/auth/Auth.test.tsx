import { render, screen } from '@testing-library/react';
import { WithProviders } from '../../test-utils';
import { AuthBox } from './Auth';

test('renders login button', () => {
  render(<WithProviders><AuthBox /></WithProviders>);
  expect(screen.getByTestId("loginButton")).toBeInTheDocument();
});