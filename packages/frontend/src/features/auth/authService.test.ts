import { AuthorizationListener, AuthorizationNotifier, AuthorizationRequest, AuthorizationServiceConfiguration, BaseTokenRequestHandler, RedirectRequestHandler, TokenResponse } from '@openid/appauth';
import jwt from "jwt-decode";
import * as authService from './authService';

jest.mock('@openid/appauth');

jest.mock('jwt-decode');

Object.defineProperty(window, 'location', {
    value: {
        origin: 'https://url.com'
    }
})

process.env = {
    NODE_ENV: "test",
    PUBLIC_URL: "url.com",
    REACT_APP_OPENID_ISSUER: "https://issuer.com",
    REACT_APP_AUTH_CLIENT_ID: "a_client_id",
    REACT_APP_API_URL: "http://localhost:7000",
    REACT_APP_AUTH_SCOPE: "admin regular",
    REACT_APP_AUTH_AUDIENCE: "node-api"
}

const getItemFromStorage = jest.fn();
const setItemToStorage = jest.fn();
const removeItemFromStorage = jest.fn();

Storage.prototype.getItem = getItemFromStorage;
Storage.prototype.setItem = setItemToStorage;
Storage.prototype.removeItem = removeItemFromStorage;

beforeEach(() => {
    getItemFromStorage.mockReset();
    setItemToStorage.mockReset();
    removeItemFromStorage.mockReset();
})

test('should perform login', async () => {
    AuthorizationServiceConfiguration.fetchFromIssuer = jest.fn().mockResolvedValue({ foo: 'bar' });
    await authService.login();
    expect(AuthorizationRequest).toHaveBeenCalledWith({
        client_id: "a_client_id",
        redirect_uri: "https://url.com/callback",
        response_type: "code",
        scope: "openid profile email admin regular",
        state: undefined,
        extras: {
            audience: "node-api"
        },
    },
        undefined,
        true);
    expect((RedirectRequestHandler as jest.Mock).mock.instances[0].performAuthorizationRequest).toHaveBeenCalled();
})

test('should handle auth callback', done => {
    AuthorizationServiceConfiguration.fetchFromIssuer = jest.fn().mockResolvedValue({ foo: 'bar' });
    const tokenJson = { access_token: 'at', expires_in: '2000', id_token: 'id', scope: 'openid profile email admin regular' };

    (TokenResponse as jest.Mock).mockImplementation(() => ({
        accessToken: tokenJson.access_token,
        idToken: tokenJson.id_token,
        expiresIn: tokenJson.expires_in
    }));

    (jwt as jest.Mock).mockReturnValue({ email: 'foo@email.com' });

    const performTokenRequest = jest.fn().mockResolvedValue(new TokenResponse(tokenJson));
    (BaseTokenRequestHandler as jest.Mock).mockImplementation(() => ({
        performTokenRequest
    }));

    let authListenerObj: any;

    (AuthorizationNotifier as jest.Mock).mockImplementation(() => ({
        setAuthorizationListener: (listener: AuthorizationListener) => authListenerObj = listener
    }));

    (RedirectRequestHandler as jest.Mock).mockImplementation(() => ({
        setAuthorizationNotifier: jest.fn(),
        completeAuthorizationRequestIfPossible: () => authListenerObj({}, { code: 'secret_code' }, null)
    }));

    authService.handleCallback(token => {
        try {
            expect(token).toBeTruthy();
            expect(TokenResponse).toHaveBeenCalledWith(tokenJson);
            expect(setItemToStorage).toHaveBeenCalledWith('access_token', tokenJson.access_token);
            expect(setItemToStorage).toHaveBeenCalledWith('id_token', tokenJson.id_token);
            expect(setItemToStorage).toHaveBeenCalledWith('email', 'foo@email.com');
        } catch (err) {
            done(err);
        }
        done();
    }, err => { throw new Error(err) });


})

test('should perform logout', () => {
    authService.logout();
    expect(removeItemFromStorage).toHaveBeenCalledWith('access_token');
    expect(removeItemFromStorage).toHaveBeenCalledWith('id_token');
    expect(removeItemFromStorage).toHaveBeenCalledWith('email');
    expect(removeItemFromStorage).toHaveBeenCalledWith('expiresAt');
})

test('should return isAuthenticated true', () => {
    getItemFromStorage.mockReturnValueOnce('at').mockReturnValueOnce('2199-01-01');
    expect(authService.isAuthenticated()).toBeTruthy();
})

test('should return isAuthenticated false when there is no access token', () => {
    getItemFromStorage.mockReturnValueOnce(null);
    expect(authService.isAuthenticated()).toBeFalsy();
})

test('should return isAuthenticated false when token is expired', () => {
    getItemFromStorage.mockReturnValueOnce('at').mockReturnValueOnce('2001-01-01');
    expect(authService.isAuthenticated()).toBeFalsy();
})

test('middleware should attach AT on request header', async () => {
    getItemFromStorage.mockReturnValueOnce('at');
    const params = await authService.authHeaderMiddleware({ fetch: () => Promise.reject(), url: '', init: { headers: {} } });
    expect((params.init.headers as any)['Authorization'])
        .toEqual('Bearer at');
})