import reducer, { AuthState, checkAuth } from './authSlice';

const getItemFromStorage = jest.fn();

Storage.prototype.getItem = getItemFromStorage;


beforeEach(() => {
    getItemFromStorage.mockReset();
})

test('should update state when the user is logged in', () => {

    getItemFromStorage
        .mockReturnValueOnce('email@server.com')
        .mockReturnValueOnce('at')
        .mockReturnValueOnce('2199-01-01');

    const previousState: AuthState = { isAuthenticated: false };

    expect(reducer(previousState, checkAuth())).toEqual(
        {
            isAuthenticated: true,
            email: 'email@server.com'
        }
    )
})

test('should update state when the user is not logged in', () => {

    const previousState: AuthState = {
        isAuthenticated: true,
        email: 'email@server.com'
    };

    expect(reducer(previousState, checkAuth())).toEqual(
        {
            isAuthenticated: false
        }
    )
})