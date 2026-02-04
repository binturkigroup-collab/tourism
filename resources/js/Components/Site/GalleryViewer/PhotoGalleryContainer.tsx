import React from 'react';
import CustomImageList from "@/Components/Site/GalleryViewer/GalleryComponents/CustomImageList";
import {Container} from "typedi";
import "reflect-metadata";
import AlbumService from "@/Services/AlbumService/AlbumService";
import File from "@/models/files/File";
import SliderContainer from "@/Components/Site/GalleryViewer/GalleryComponents/SliderContainer";

import {GalleryContextProvider} from "@/Components/Site/GalleryViewer/Context/GalleryContext";

const PhotoGalleryContainer: React.FC<{album: File [], title?: string}> = ({album, title}) => {
    const albumService = Container.get(AlbumService);
    const uri = '/file/blocks/';

    const [open, setOpen] = React.useState<boolean>(false);

    const openViewer = () => setOpen(true);
    const closeViewer = () => setOpen(false);

    return (
        <GalleryContextProvider value={{open, openViewer, closeViewer, album, uri, title}}>
            <CustomImageList></CustomImageList>
            <SliderContainer></SliderContainer>
        </GalleryContextProvider>

    );
};

export default PhotoGalleryContainer;
