import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import CustomButton from "@/Components/Button/CustomButton";
import useImageHook from "@/Hooks/ImageHook";
import FileService from "@/Services/FileService/FileService";
import {Container} from "typedi";
import "reflect-metadata";
import {Box} from "@mui/material";



type AddFileButtonProp = {
    imageChanged: (file: File | null) => void,
    text: string,
}

const AddImageButton : React.FC<AddFileButtonProp> = ({imageChanged, text = 'Product'}) => {
    const fileService = Container.get(FileService);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = () => {
        inputRef.current?.click();
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event && event.target && fileService.assertImage(event.target?.files?.[0] as File)) {
            imageChanged(event.target?.files?.[0] as File);
        }
    }

    return (
        <Box>
            <CustomButton task="add" text={`${text} image`} onClick={handleClick}></CustomButton>
            <input type="file"
                   id="hidden-input"
                   className="hidden"
                   ref={inputRef}
                   onChange={handleChange}
            />
        </Box>
    );
}

export default AddImageButton;
