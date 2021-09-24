import { createTheme, ThemeOptions } from '@mui/material/styles';
export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#e7ecec',
        },
        secondary: {
            main: '#f50057',
        },
    },
};

export const theme = createTheme(themeOptions);