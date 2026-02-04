import React from "react";
import {ContactsProps} from "@/Components/Lists/Interfaces";

const initialState: ContactsProps = {
    contacts: [],
    limit: '0',
    offset: 0,
    search: '',
    count: 0,
    next: () => {},
    loading: false,
    changeLimit: (val: string) => {},
    onSearch: (val: string) => {},
    // activate: (id, status) => {},
    deleteFn: (id) => {},
    // reorder: ([]) => {},
}

const ContactsContext = React.createContext(initialState);

const ContactsProvider: React.FC<React.PropsWithChildren<{ value: ContactsProps }>> = ({value, children}) => {
    return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
}

const useContactsContext = () => {
    const context = React.useContext(ContactsContext);
    if (context === undefined) {
        throw new Error('The context should be inside the provider!');
    }

    return context;
}

export {useContactsContext, ContactsProvider};
