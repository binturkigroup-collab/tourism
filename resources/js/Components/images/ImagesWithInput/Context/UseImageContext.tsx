import React, {PropsWithChildren} from "react";
import {UploadImagePropsWithInput} from "@/Interfaces/ValidatedInput/IUploadImage";

interface CustomImageInput extends UploadImagePropsWithInput{
    inputRef: React.RefObject<any>;
    error?: string;
    iconClasses?: string;
}

const initialValue: CustomImageInput = {
    image: '',
    classes: '',
    className: '',
    callback: () => {},
    imageChanged: () => {},
    inputRef: React.createRef(),
    error: '',
    iconClasses: '',
};



const ImageContext = React.createContext<CustomImageInput>(initialValue);

const ImageProvider: React.FC<PropsWithChildren<{value: CustomImageInput}>> = ({value, children}) => {
    return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
}

const useImageContext = () => {
    const context = React.useContext(ImageContext);
    if (context === undefined) {
        throw new Error('The context must be inside the provider');
    }

    return context;
}

export {useImageContext, ImageProvider};
