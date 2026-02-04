import React, {useEffect} from 'react';
import styles from "./styles.module.scss";
import {useImageContext} from "@/Components/images/ImagesWithInput/Context/UseImageContext";
import {CardMedia} from "@mui/material";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import FileService from "@/Services/FileService/FileService";

const Layout = () => {
    const fileService = ServiceContainer.get(FileService);
    const {image, classes, className} = useImageContext();
    const isSVGUrl = (url: string): boolean => {
        return url.toLowerCase().endsWith('.svg');
    }

    return (
        isSVGUrl(image || '') ? (
                <object className={classes} data={image || ''} type="image/svg+xml" width="100%" height="100%">
                    {/* Fallback if object fails */}
                    <img src={image || ''} width={'160px'} height={'160px'} alt="svg fallback" />
                </object>
            ) :
            <CardMedia
                classes={{
                    img: classes,
                }}
                component="img"
                // src={(assertImage && imageProp) ? URL.createObjectURL(imageProp) : (image || fileService.DefaultImage)}
                // src={image || '/file/users/default.png'}
                image={image || '/file/users/default.png'}
                alt="photo"
                className={className}
            />

    );
};

export default Layout;
