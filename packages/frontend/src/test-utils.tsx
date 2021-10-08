import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router';
import { store } from "./app/store";

export const WithProviders: React.FC<any> = ({ children, reduxState = {} }) => {
    jest.spyOn(store, "getState").mockReturnValue(reduxState);
    return <Provider store={store}>
        <MemoryRouter>
            {children}
        </MemoryRouter>
    </Provider>
}