import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router';
import { store } from "./app/store";

export const WithProviders: React.FC = ({ children }) =>
    <Provider store={store}>
        <MemoryRouter>
            {children}
        </MemoryRouter>
    </Provider>