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
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
};

export const theme = createTheme(themeOptions);