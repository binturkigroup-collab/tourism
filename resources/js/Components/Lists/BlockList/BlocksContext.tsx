import React from "react";
import {BlockProps} from "@/Components/Lists/Interfaces";

const initialState: BlockProps = {
    blocks: [],
    limit: '0',
    offset: 0,
    search: '',
    count: 0,
    next: () => {},
    loading: false,
    changeLimit: (val: string) => {},
    onSearch: (val: string) => {},
    activate: (id, status) => {},
    deleteFn: (id, category?: string) => {},
    reorder: ([]) => {},
}

const BlocksContext = React.createContext(initialState);

const BlocksProvider: React.FC<React.PropsWithChildren<{ value: BlockProps }>> = ({value, children}) => {
    return <BlocksContext.Provider value={value}>{children}</BlocksContext.Provider>
}

const useBlocksContext = () => {
    const context = React.useContext(BlocksContext);
    if (context === undefined) {
        throw new Error('The context should be inside the provider!');
    }

    return context;
}

export {useBlocksContext, BlocksProvider};
