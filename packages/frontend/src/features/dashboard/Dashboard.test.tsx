import { render, screen } from '@testing-library/react';
import { WithProviders } from '../../test-utils';
import { Dashboard } from './Dashboard';
import { initialState } from './dashboardSlice';

const mockDispatch = jest.fn();

jest.mock('../../app/hooks', () => ({
    ...jest.requireActual('../../app/hooks'),
    useAppDispatch: () => mockDispatch,
}))

/* Be aware of Recharts bug https://github.com/recharts/recharts/issues/727 
that causes warnings in tests about the sizing of the ResponsiveContainer;
until it is fixed, you can keep this here to prevent log pollution
*/
jest.spyOn(global.console, 'warn').mockImplementationOnce((message) => {
    if (!message.includes('The width(0) and height(0) of chart should be greater than 0')) {
      global.console.warn(message);
    }
  });

test('loads page', () => {
    const state = { dashboard: initialState };
    render(<WithProviders reduxState={state}><Dashboard /></WithProviders>);

    expect(mockDispatch).toBeCalledTimes(4);

    expect(screen.getByTestId('table-card')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart-card')).toBeInTheDocument();
    expect(screen.getByTestId('time-series-card')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart-card')).toBeInTheDocument();
});