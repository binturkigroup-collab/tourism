import React from "react";
import {useTranslation} from "react-i18next";


const LanguageHandlerContext = React.createContext({lang: ''});

const LanguageHandlerProvider: React.FC<React.PropsWithChildren<{value: {lang: string}}>> =
    ({children, value}) => {
        const { t, i18n: {changeLanguage, language} } = useTranslation();
        React.useMemo(() => {
            changeLanguage(value.lang);
        }, [value.lang]);
    return <LanguageHandlerContext.Provider value={value}>{children}</LanguageHandlerContext.Provider>
}

export {LanguageHandlerProvider};
