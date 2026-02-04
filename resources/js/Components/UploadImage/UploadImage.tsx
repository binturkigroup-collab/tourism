import React, {useState} from 'react';
import styles from "@/Components/Site/Cover/styles.module.scss";
import {Container} from "typedi";
import "reflect-metadata";
import FileService from "@/Services/FileService/FileService";
import CustomIcon from "@/Components/Icon/Icon";
import {
    CardMedia,
    Box
} from "@mui/material";
import UploadedImageProps from "@/Interfaces/ValidatedInput/IUploadImage";
const UploadImage: React.FC<UploadedImageProps> = ({image = '/file/defaults/default-cover.jpg', className = 'relative', classes=''}) => {
    const fileService = Container.get(FileService);
    return(

        <CardMedia
            classes={{
                img: classes,
            }}
            component="img"
            src={image || fileService.DefaultImage}
            alt="photo"
            className={className}
        />

        // <CustomIcon name="account"/>

    )
}

export default UploadImage;
