import React from 'react';
import Album from "@/Components/Album/Album";
import Image from "@/models/files/File";
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import "reflect-metadata";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {Block} from "@/models/block/Block";

const Gallery: React.FC<{block: Block}> = ({block}) => {
    const [selectedBlock, setSelectedBlock] = React.useState<Block>({...block});
    const [selectedImages, setSelectedImages] = React.useState<Image []>(block.images.filter(image => !image.isCover));
    const blockService = Container.get(BlockService);

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    // =========================================================================================
    // Handle Adding image to album:
    const addAlbumImage = (file: File | null) => {
        const formData = new FormData();
        formData.append('image', (file as Blob));
        formData.append('isCover', 'false');
        blockService.addImage(formData, selectedBlock.id).then(response => {
            setSelectedBlock(response.data as Block);
            setSelectedImages(response.data.images.filter(image => !image.isCover));
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Image has been added!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while adding image!', severity: "error" })
            );
        })
    }

    // =========================================================================================
    // Handle updating image to album:
    const updateAlbumImage = (file: File | null, id: number) => {
        const formData = new FormData();
        formData.append('image', (file as Blob));
        formData.append('imageId', String(id));
        blockService.uploadImage(formData, block.id).then(response => {
            setSelectedBlock(response.data as Block);
            setSelectedImages(response.data.images.filter(image => !image.isCover));
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Image has been updated!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while uploading image!', severity: "error" })
            );
        })
    }

    // =========================================================================================
    // Handle deleting image from album:
    const deleteAlbumImage = (id: number) => {
        const formData = new FormData();
        formData.append('imageId', String(id));
        blockService.deleteImage(formData, block.id).then(response => {
            setSelectedBlock(response.data as Block);
            setSelectedImages(response.data.images.filter(image => !image.isCover));
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Image has been deleted!', severity: "success" })
            );
        }).catch(error => {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: true, message: 'Error Happened while deleting image!', severity: "error" })
            );
        })
    }

    // =========================================================================================

    return (
        <Album
            images={selectedImages}
            callbackImageUrl={blockService.getImageUrl}
            addImage={(file) => addAlbumImage(file)}
            updateImage={(file, id) => updateAlbumImage(file, id)}
            deleteImage={(id) => deleteAlbumImage(id)}
            text="Gallery"
        />
    );
};

export default Gallery;
