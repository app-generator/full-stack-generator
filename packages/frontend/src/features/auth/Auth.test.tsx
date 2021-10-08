import { render, screen } from '@testing-library/react';
import { WithProviders } from '../../test-utils';
import { AuthBox, Callback } from './Auth';
import * as authService from './authService';

jest.mock('./authService');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Redirect: (props:any) => <span>Redirected to {props.to}</span>,
  useHistory: () => ({
    push: mockHistoryPush
  }),
}));


test('login button', () => {
  const state = { auth: { isAuthenticated: false } };
  render(<WithProviders reduxState={state}><AuthBox /></WithProviders>);
  expect(authService.isAuthenticated).toHaveBeenCalled();
  const loginButton = screen.getByTestId("loginButton");
  expect(loginButton).toBeInTheDocument();
  loginButton.click();
  expect(authService.login).toHaveBeenCalled();
});

test('logout button', () => {
  const state = { auth: { isAuthenticated: true } };
  render(<WithProviders reduxState={state}><AuthBox /></WithProviders>);
  expect(authService.isAuthenticated).toHaveBeenCalled();
  const logoutButton = screen.getByTestId("logoutButton")
  expect(logoutButton).toBeInTheDocument();
  logoutButton.click();
  expect(authService.logout).toHaveBeenCalled();
  expect(authService.isAuthenticated).toHaveBeenCalled();
  expect(mockHistoryPush).toHaveBeenCalledWith('/');
});

test('auth callback', () => {
  const state = { auth: { isAuthenticated: false } };
  const handleCallbackMock = authService.handleCallback as jest.Mock<typeof authService.handleCallback>;
  handleCallbackMock.mockImplementation((success, error) => success());
  render(<WithProviders reduxState={state}><Callback /></WithProviders>);
  expect(screen.getByText('Redirected to /dashboard')).toBeInTheDocument();
})

test('auth callback error', () => {
  const state = { auth: { isAuthenticated: false } };
  const handleCallbackMock = authService.handleCallback as jest.Mock<typeof authService.handleCallback>;
  handleCallbackMock.mockImplementation((success, error) => error("Auth error"));
  render(<WithProviders reduxState={state}><Callback /></WithProviders>);
  expect(screen.getByText('Redirected to /')).toBeInTheDocument();
})