import React, {PropsWithChildren} from "react";
import File from "@/models/files/File";

type GalleryContextProps = {
    open: boolean;
    openViewer: () => void;
    closeViewer: () => void;
    album: File [],
    uri: string,
    title?: string,
}

// This context is responsible to open/close the gallery viewer and distribute images to be displayed!

const defaultValue: GalleryContextProps = {
    open: false,
    openViewer: () => {},
    closeViewer: () => {},
    album: [],
    uri: '',
    title: '',
}

const GalleryContext = React.createContext(defaultValue);

const GalleryContextProvider: React.FC<PropsWithChildren<{ value: GalleryContextProps }>> = ({children, value}) => (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
)

const useGalleryContext = () => {
    const data = React.useContext(GalleryContext);
    if (data === undefined) {
        throw new Error('Context must be inside the provider!')
    }

    return data;
}

export {useGalleryContext, GalleryContextProvider};
