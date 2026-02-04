import React from "react";

interface IAutogenerateProvider {
    code: string,
    generateCode: () => void,
    handyCode: () => void,
}

const autogenerateContext =
    React.createContext<IAutogenerateProvider>(
        {code: '', generateCode: () => {}, handyCode: () => {}}
    );

const AutoGenerateProvider = ({children, value}) => {
    return <autogenerateContext.Provider value={value}>{children}</autogenerateContext.Provider>
}

const useAutogenerateContext = () => {
    return React.useContext(autogenerateContext);
}

export {AutoGenerateProvider, useAutogenerateContext};
