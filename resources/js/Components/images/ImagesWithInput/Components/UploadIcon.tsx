import React from 'react';
import styles from "./styles.module.scss";
import {Box, IconButton} from "@mui/material";
import CustomIcon from "@/Components/Icon/Icon";
import {useImageContext} from "@/Components/images/ImagesWithInput/Context/UseImageContext";

const UploadIcon = () => {
    const {inputRef, iconClasses} = useImageContext();
    const handleClick = () => {
        inputRef?.current?.click();
    }

    return (
        <Box className={`absolute bg-white rounded-full ${iconClasses ? iconClasses : 'right-[16px] bottom-[16px]'}`}>
            <IconButton onClick={handleClick} className="">
                <CustomIcon name="edit" size={24}></CustomIcon>
            </IconButton>
        </Box>
    );
};

export default UploadIcon;
