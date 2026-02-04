import React from "react";
import {ImageInput, Layout, UploadIcon, ErrorMessage} from "./Components";
import {ImageProvider} from "./Context/UseImageContext";
import {Box} from "@mui/material";
import useImageHook from "@/Hooks/ImageHook";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import FileService from "@/Services/FileService/FileService";


const ImageContainer: React.FC<
    {
        image: string,
        onChange: (File) => void,
        iconClasses: string,
        classes: string,
    }> = ({image, onChange, iconClasses = '', classes}) => {
    const fileService = ServiceContainer.get(FileService);
    const [currentImage, setImage] = React.useState<string>(image)
    const [error, setError] = React.useState<string>('');
    const inputRef = React.useRef(null);

    const callback = (image: File | null) => {
        if (image) {
            if (!fileService.assertSize(image)) {
                setError(`Image Size must be less than ${FileService.MAX_FILE_SIZE}KB!`);
            } else if (!fileService.assertImage(image)) {
                setError('Please upload an image!');
            } else {
                setError('');
                setImage(URL.createObjectURL(image));
                onChange(image);
            }
        }
        // if (image && fileService.assertImage(image)) {
        //     setError('');
        //     setImage(URL.createObjectURL(image));
        //     onChange(image);
        // }
        // else {
        //     setError('Please upload an image!');
        // }
    }

    const imageChanged = () => {

    }
    return (
        <ImageProvider value={{image: currentImage, callback, imageChanged, inputRef, error, iconClasses, classes}}>
            <Box>
                <Box className="relative">
                    <Layout />
                    <UploadIcon />
                </Box>
                <ImageInput />
                <ErrorMessage />
            </Box>
        </ImageProvider>
    );
}

export default ImageContainer;
