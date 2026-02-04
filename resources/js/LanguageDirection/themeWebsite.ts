import { createTheme, Theme } from "@mui/material/styles";

import mixArabBold from "../../fonts/mixArabBold.ttf";
import mixArabRegular from "../../fonts/mixArabRegular.ttf";
import hacen from "../../fonts/Hacen.ttf";

export const getWebsiteTheme = (direction: "ltr" | "rtl"): Theme =>
    createTheme({
        direction,
        typography: {
            fontFamily:
                direction === "rtl" ?
                    ['theMixArab', 'sans-serif'].join(','):
                    "hacen, sans-serif",
        },

        components: {
            MuiCssBaseline: {
                styleOverrides: `
                  @font-face {
                  font-family: 'theMixArab';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 400;

                  src: url(${mixArabRegular}) format('truetype');
                  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                  @font-face {
                  font-family: 'theMixArab';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 700;

                  src: url(${mixArabBold}) format('truetype');
                  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }

                @font-face {
                  font-family: 'hacen';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 400;

                  src: url(${hacen}) format('truetype');
                  unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }
                `
            }
        }
    });
