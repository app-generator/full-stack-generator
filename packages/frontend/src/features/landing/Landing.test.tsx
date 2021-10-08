import { render, screen } from '@testing-library/react';
import { WithProviders } from '../../test-utils';
import { Landing } from './Landing';

const mockDispatch = jest.fn();

jest.mock('../../app/hooks', () => ({
    ...jest.requireActual('../../app/hooks'),
    useAppDispatch: () => mockDispatch,
}))

test('loads page', () => {
    const state = {
        landingPage: {
            articles: [
                { id: '1', title: 'lorem 1', publishDate: new Date('2020-10-01T10:00:00Z'), text: 'lorem ipsum dolor' },
                { id: '2', title: 'lorem 2', publishDate: new Date('2020-11-01T11:00:00Z'), text: 'lorem ipsum dolor sit amet' }
            ]
        }
    };
    render(<WithProviders reduxState={state}><Landing /></WithProviders>);

    expect(mockDispatch).toBeCalled();

    expect(screen.getByTestId('landing-title')).toBeInTheDocument();
    expect(screen.getByTestId('landing-subtitle')).toBeInTheDocument();
    expect(screen.getByTestId('landing-articles')).toBeInTheDocument();
    expect(screen.getByTestId('landing-articles').children.length).toEqual(2);
});