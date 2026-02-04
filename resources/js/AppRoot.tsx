import {PropsWithChildren, useEffect, useMemo} from "react";
import {useAppSelector} from "@/Redux/Store/hook";
import {createTheme, useTheme, ThemeProvider} from "@mui/material";
import {indigo, pink, purple, lime, green, lightGreen, red, teal} from "@mui/material/colors";
import {usePage} from "@inertiajs/react";
import LatoBold from "../fonts/Lato-Bold.ttf";
import LatoRegular from "../fonts/Lato-Regular.ttf";

const AppRoot = ({children} : PropsWithChildren) => {
    const themeMode = useAppSelector(state => state.theme.mode);
    const dark = useAppSelector(state => state.theme.dark);

    // const lang = usePage().props.lang;
    // const languages = usePage().props.settings.languages;
    // console.log('lang: ', lang);
    // console.log('languages: ', languages);

    const theme = useMemo( () => createTheme({
        palette: {
            mode: themeMode,
            ...(dark) ? {
                primary: {
                    main: '#3d5afe',
                },
                secondary: {
                    main: '#009688',
                },
                info: {
                    main: green[900],
                },
                text: {
                    primary: '#fafafa',
                },
                action: {
                    active: '#fafafa',
                },
                background: {
                    default: '#1f2937',
                    paper: '#1f2937',
                },
                activate: {
                    main: lightGreen["A400"],
                },

                deactivate: {
                    main: pink["A400"],
                },

            } : {
                primary: {
                    main: '#2a3eb1',
                },
                secondary: {
                    main: '#357a38',
                },
                info: {
                    main: green[900],
                },
                text: {
                    primary: '#374151',
                },
                action: {
                    active: '#374151',
                },
                background: {
                    default: '#d4d4d4',
                    paper: '#d4d4d4',
                },
                activate: {
                    main: green[700],
                },
                deactivate: {
                    main: red[900],
                },
            }
        },
        typography: {
            fontFamily: [
                'lato',
                'sans-serif',
            ].join(','),
        },

        components: {
            MuiCssBaseline: {
                styleOverrides: `
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-display: swap;
          font-weight: 400;

          src: url(${LatoRegular}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-display: swap;
          font-weight: 700;

          src: url(${LatoBold}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
            },
        },
    }), [themeMode]);

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
export default AppRoot;
