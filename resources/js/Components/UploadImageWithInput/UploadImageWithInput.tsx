import React, {ChangeEvent, useRef, useState, useEffect} from "react";
import styles from "./styles.module.scss";
import FileService from "@/Services/FileService/FileService";
import {Container} from "typedi";
import "reflect-metadata";
import UploadedImageProps, {UploadImagePropsWithInput} from "@/Interfaces/ValidatedInput/IUploadImage";
import {
    CardMedia,
    Box, IconButton
} from "@mui/material";
import CustomIcon from "@/Components/Icon/Icon";
import useImageHook from "@/Hooks/ImageHook";

// TODO: handle drag and drop using react-dropzone.
const UploadImageWithInput : React.FC<UploadImagePropsWithInput> = (
    {
        className = 'relative',
        classes='',
        callback = (image: File | null) => {},
        image = null,
        imageChanged,
    }) => {
    const [imageProp, setImage] = useState<File | null>(null);
    // const [imageChanged, setImageChanged] = useState<boolean>(false);
    const fileService = Container.get(FileService);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const assertImage = useImageHook(imageProp);
    const handleClick = () => {
        inputRef?.current?.click();
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event && (event?.target as (HTMLInputElement | null))?.files?.[0] || null;
        setImage(file);
        imageChanged();
    }

    useEffect(() => {
        if (assertImage) callback(imageProp);
        else callback(null);
    }, [assertImage, imageProp]);

    return (
        <Box>
            <CardMedia
                classes={{
                    img: classes,
                }}
                component="img"
                src={(assertImage && imageProp) ? URL.createObjectURL(imageProp) : (image || fileService.DefaultImage)}
                alt="photo"
                className={className}
            />
            <Box className="absolute bottom-[16px] right-[16px] bg-white rounded-full">
                <IconButton onClick={handleClick} className="">
                    <CustomIcon name="edit"></CustomIcon>
                </IconButton>
            </Box>

            <input type="file"
                    id="hidden-input"
                   className="hidden"
                   ref={inputRef}
                   onChange={handleChange}
            />
        </Box>
    );
}

export default UploadImageWithInput;
