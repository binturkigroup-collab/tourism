import React from "react";
import {MenuProps} from "@/Components/Lists/Interfaces";

const initialState: MenuProps = {
    menus: [],
    limit: '0',
    offset: 0,
    search: '',
    count: 0,
    next: () => {},
    loading: false,
    changeLimit: (val: string) => {},
    onSearch: (val: string) => {},
    activate: (id, status) => {},
    deleteFn: (id) => {},
    reorder: ([]) => {},
}

const MenusContext = React.createContext(initialState);

const MenusProvider: React.FC<React.PropsWithChildren<{ value: MenuProps }>> = ({value, children}) => {
    return <MenusContext.Provider value={value}>{children}</MenusContext.Provider>
}

const useMenusContext = () => {
    const context = React.useContext(MenusContext);
    if (context === undefined) {
        throw new Error('The context should be inside the provider!');
    }

    return context;
}

export {useMenusContext, MenusProvider};
