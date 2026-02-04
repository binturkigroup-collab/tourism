import './bootstrap';
import '../scss/styles.scss';
import '../scss/dataGridStyles.scss';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {Provider} from "react-redux";
import {store} from "@/Redux/Store/store";
import { LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import '@/Locale/i18n';
import { registerLicense } from '@syncfusion/ej2-base';
import {LanguageHandlerProvider} from "@/Contexts/LanguageHandlerContext/LanguageHandlerContext";

const appName = import.meta.env.VITE_APP_NAME || 'Feras Protfolio';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        registerLicense(import.meta.env.VITE_SYNCFUSION);
        root.render(
                <Provider store={store}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <LanguageHandlerProvider value={{lang: props.initialPage.props?.lang as string || 'en'}}>
                            <App {...props} />
                        </LanguageHandlerProvider>
                    </LocalizationProvider>
                </Provider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
