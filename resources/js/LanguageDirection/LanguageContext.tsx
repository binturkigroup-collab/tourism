import React, { createContext, useMemo, useState } from "react";
import {usePage} from "@inertiajs/react";

// export type Language = "en" | "ar";

interface LangContextTypes {
    lang: string;
    setLang: (lang: string) => void;
    direction: "ltr" | "rtl";
}

export const LanguageContext = createContext<LangContextTypes>({
    lang: "en",
    setLang: () => {},
    direction: "ltr",
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                              children,
                                                                          }) => {
    const [lang, setLang] = useState<string>(usePage().props.lang);

    const direction: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

    const value = useMemo(
        () => ({ lang, setLang, direction }),
        [lang, direction]
    );

    // Update HTML direction (very important)
    React.useEffect(() => {
        document.documentElement.setAttribute("dir", direction);
    }, [direction]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
