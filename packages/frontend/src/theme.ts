import { createTheme, ThemeOptions } from '@mui/material/styles';
export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#e7ecfc',
        },
        secondary: {
            main: '#6500f7',
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