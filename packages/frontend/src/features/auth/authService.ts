import {
    AuthorizationNotifier,
    AuthorizationRequest,
    AuthorizationResponse,
    AuthorizationServiceConfiguration,
    BaseTokenRequestHandler,
    BasicQueryStringUtils,
    DefaultCrypto,
    FetchRequestor,
    GRANT_TYPE_AUTHORIZATION_CODE,
    LocalStorageBackend,
    LocationLike,
    RedirectRequestHandler,
    TokenRequest,
    TokenResponse
} from "@openid/appauth";
import { FetchParams, RequestContext } from "generated-api";
import jwt from "jwt-decode";
import moment from "moment";


class NoHashQueryStringUtils extends BasicQueryStringUtils {
    parse(input: LocationLike, useHash: boolean) {
        return super.parse(input, false /* never use hash */);
    }
}

const getAuthorizationHandler = () => new RedirectRequestHandler(
    new LocalStorageBackend(),
    new NoHashQueryStringUtils(),
    window.location,
    new DefaultCrypto()
);

const fetchToken =
    async (request: AuthorizationRequest, response: AuthorizationResponse): Promise<TokenResponse> => {
        const tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
        let extras: any = {};
        if (request && request.internal) {
            extras.code_verifier = request.internal.code_verifier;
        }

        const tokenRequest = new TokenRequest({
            client_id: process.env.REACT_APP_AUTH_CLIENT_ID!,
            redirect_uri: `${window.location.origin}/callback`,
            grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
            code: response.code,
            refresh_token: undefined,
            extras,
        });

        try {

            const authServiceConfig: AuthorizationServiceConfiguration = await AuthorizationServiceConfiguration.fetchFromIssuer(
                process.env.REACT_APP_OPENID_ISSUER!,
                new FetchRequestor()
            );

            const tokenResponse: TokenResponse = await tokenHandler.performTokenRequest(
                authServiceConfig,
                tokenRequest
            );

            localStorage.setItem('access_token', tokenResponse.accessToken);
            if (!!tokenResponse.idToken) {
                localStorage.setItem("id_token", tokenResponse.idToken);
                localStorage.setItem(
                    "email",
                    (jwt(tokenResponse.idToken) as any).email
                );
            }

            localStorage.setItem(
                "expiresAt",
                moment().add(tokenResponse.expiresIn || 0, 's').toISOString()
            );

            return Promise.resolve(tokenResponse);
        } catch (err) {
            return Promise.reject(err)
        }
    }

const getAuthorizationListener = (onSuccess: (token: TokenResponse) => void, onError: (error: any) => void) =>
    (request: AuthorizationRequest, response: AuthorizationResponse | null, error: any) => {
        if (error) {
            onError(error)
        }

        if (!response) {
            onError('No auth response received');
        }

        fetchToken(request, response!)
            .then(token => onSuccess(token))
            .catch(err => onError(err));
    }

export const login = async (): Promise<void> => {
    const authServiceConfiguration: AuthorizationServiceConfiguration =
        await
            AuthorizationServiceConfiguration.fetchFromIssuer(
                process.env.REACT_APP_OPENID_ISSUER!,
                new FetchRequestor()
            );

    const authorizationHandler = getAuthorizationHandler();
    const authRequest = new AuthorizationRequest(
        {
            client_id: process.env.REACT_APP_AUTH_CLIENT_ID!,
            redirect_uri: `${window.location.origin}/callback`,
            scope: `openid profile email ${process.env.REACT_APP_AUTH_SCOPE!}`,
            response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
            state: undefined,
            extras: { audience: "node-api" },
            // extras: environment.extra
        },
        undefined,
        true
    );
    authorizationHandler.performAuthorizationRequest(authServiceConfiguration, authRequest);
}

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("email");
    localStorage.removeItem("expiresAt");
};

export const isAuthenticated = () => localStorage.getItem('access_token') !== null && moment(localStorage.getItem('expiresAt')).isAfter(moment());

export const handleCallback = (onSuccess: (response: TokenResponse) => void, onError: (error: any) => void) => {
    const authorizationHandler = getAuthorizationHandler();
    const notifier = new AuthorizationNotifier();
    authorizationHandler.setAuthorizationNotifier(notifier);
    notifier.setAuthorizationListener(getAuthorizationListener(onSuccess, onError));
    authorizationHandler.completeAuthorizationRequestIfPossible();
}


export const authHeaderMiddleware = async (
    req: RequestContext
): Promise<FetchParams> => {
    return Promise.resolve({
        ...req,
        init: {
            ...req.init,
            headers: {
                ...(req.init.headers || {}),
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        },
    });
};
