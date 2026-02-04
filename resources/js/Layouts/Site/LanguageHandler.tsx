import React from 'react';
import {useTranslation} from "react-i18next";
import {usePage} from "@inertiajs/react";

const LanguageHandler = () => {
    const lang = usePage().props.lang;
    const { t, i18n: {changeLanguage, language} } = useTranslation();
    React.useMemo(() => {
        changeLanguage(lang);
    }, [lang]);
    return (
        <div>

        </div>
    );
};

export default LanguageHandler;
