import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from "./en/en.json";
import arJSON from "./ar/ar.json";
i18n.use(initReactI18next).init({
    resources: {
        en: {...enJSON},
        ar: {...arJSON},
    }, // Where we're going to put translations' files
    lng: "en",     // Set the initial language of the App
});
