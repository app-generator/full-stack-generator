import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import { WithProviders } from './test-utils';

test('renders app with main sections', () => {
    const state = { auth: { isAuthenticated: false }, landingPage: { loading: false, articles: [] } };
    render(<WithProviders reduxState={state}>
        <App />
    </WithProviders>);
    expect(screen.getByTestId("mainMenu")).toBeInTheDocument();
    expect(screen.getByTestId("leftToolbar")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("mainContent")).toBeInTheDocument();
});