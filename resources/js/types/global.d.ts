import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';
import type {Page} from "@inertiajs/core";
import {PageProps} from "@/types/index";

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}

declare module "@inertiajs/react" {
    export function usePage<T extends PageProps>() : Page<T>
}

declare module '@mui/material/styles' {
    interface Palette {
        activate: Palette['primary'];
        deactivate: Palette['primary'];
    }

    interface PaletteOptions {
        activate?: PaletteOptions['primary'];
        deactivate?: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        activate: true;
        deactivate: true;
    }
}

declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides {
        activate: true;
        deactivate: true;
    }
}

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}
