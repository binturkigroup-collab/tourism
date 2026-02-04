import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import CustomButton from "@/Components/Button/CustomButton";
import useImageHook from "@/Hooks/ImageHook";
import FileService from "@/Services/FileService/FileService";
import {Container} from "typedi";
import "reflect-metadata";
import {Box} from "@mui/material";
import IButtonProps from "@/Interfaces/IButtonProps";
import {ButtonProps} from "@mui/material/Button";



interface AddFileButtonProp extends ButtonProps{
    fileChanged: (file: File | null) => void,
    text: string,
}

const AddFileButton : React.FC<AddFileButtonProp> = ({fileChanged, text = 'Product', ...props}) => {
    const fileService = Container.get(FileService);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = () => {
        inputRef.current?.click();
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            fileChanged(event.target?.files?.[0] as File);
        }
    }

    return (
        <Box>
            <CustomButton task="add" text={`${text} File`} onClick={handleClick} {...props}></CustomButton>
            <input type="file"
                   id="hidden-input"
                   className="hidden"
                   ref={inputRef}
                   onChange={handleChange}
            />
        </Box>
    );
}

export default AddFileButton;
