import { render, screen } from '@testing-library/react';
import dom from "react-router-dom";
import { WithProviders } from '../../test-utils';
import { Nav } from './Nav';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useHistory: () => ({
        push: mockHistoryPush
      }),
}));

test('loads nav from home, not authenticated', () => {
    const state = { auth: { isAuthenticated: false } };
    jest.spyOn(dom, "useLocation").mockReturnValue({ pathname: '/', hash: '', search: '', state: '' })
    render(<WithProviders reduxState={state}><Nav /></WithProviders>);
    expect(screen.queryByTestId('dashboard-link')).toBeNull();
    expect(screen.queryByTestId('home-link')).toBeNull();
});

test('loads nav from home, authenticated, click on dashboard', () => {
    const state = { auth: { isAuthenticated: true } };
    jest.spyOn(dom, "useLocation").mockReturnValue({ pathname: '/', hash: '', search: '', state: '' })
    render(<WithProviders reduxState={state}><Nav /></WithProviders>);
    expect(screen.queryByTestId('dashboard-link')).toBeInTheDocument();
    expect(screen.queryByTestId('home-link')).toBeNull();
    screen.getByTestId('dashboard-link').click();
    expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
});

test('loads nav from dashboard, authenticated, click on home', () => {
    const state = { auth: { isAuthenticated: true } };
    jest.spyOn(dom, "useLocation").mockReturnValue({ pathname: '/dashboard', hash: '', search: '', state: '' })
    render(<WithProviders reduxState={state}><Nav /></WithProviders>);
    expect(screen.queryByTestId('dashboard-link')).toBeNull();
    expect(screen.queryByTestId('home-link')).toBeInTheDocument();
    screen.getByTestId('home-link').click();
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
});