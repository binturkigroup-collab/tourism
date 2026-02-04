import { Toaster } from "@/Pages/Site/components/ui/toaster";
import { Toaster as Sonner } from "@/Pages/Site/components/ui/sonner";
import { TooltipProvider } from "@/Pages/Site/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, {PropsWithChildren} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";

import "../scss/site.scss";

import {LanguageContext, LanguageProvider} from "./LanguageDirection/LanguageContext";
import { getWebsiteTheme } from "./LanguageDirection/themeWebsite";
import {createLtrCache, createRtlCache} from "@/LanguageDirection/createEmotionCache";
import AnalyticsProvider from "@/Providers/AnalyticsProvider";

const queryClient = new QueryClient();
const SiteAppRoot = ({children, lang} : PropsWithChildren<{lang: string}>) => {
    const { direction } = React.useContext(LanguageContext);
    const websiteTheme = getWebsiteTheme(direction);
    const websiteCache = lang === "ar" ? createRtlCache() : createLtrCache();
    const measurementId = import.meta.env.VITE_G;

    return (
        <LanguageProvider>
            <CacheProvider value={websiteCache}>
                <ThemeProvider theme={websiteTheme}>
                    <QueryClientProvider client={queryClient}>
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            <CssBaseline />
                                <AnalyticsProvider measurementId={measurementId}>
                                    {children}
                                </AnalyticsProvider>
                        </TooltipProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </CacheProvider>
        </LanguageProvider>


    )
}
export default SiteAppRoot;
