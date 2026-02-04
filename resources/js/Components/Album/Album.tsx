import React, {useState, useEffect, useMemo} from "react";
import styles from "./styles.module.scss";
import Image from "@/models/files/File";
import UploadImageWithInput from "@/Components/UploadImageWithInput/UploadImageWithInput";
import ImageInAlbum from "@/Components/Album/ImageInAlbum";
import AddImageButton from "@/Components/AddFileButton/AddImageButton";
import {Box} from "@mui/material";
import DeleteModal from "@/Components/DeleteModal/DeleteModal";


type AlbumProps = {
    images: Image [],
    callbackImageUrl: (url: string) => string,
    addImage: (file: File | null) => void,
    updateImage: (file: File | null, id: number) => void,
    deleteImage: (id: number) => void,
    text: string,
}

// callbackImageUrl: Determine the full path of image!.
const Album: React.FC<AlbumProps> = ({
     images,
     callbackImageUrl,
    addImage,
    updateImage,
    deleteImage,
    text= 'product',
}) => {

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [imageId, setImageId] = useState<number>(0);

    const handleClose = () => {
        setOpenModal(false);
    }

    const handleOpen = (id: number) => {
        setImageId(id);
        setOpenModal(true);
    }

    const handleAddedImage = (file: File | null) => {
        addImage(file);
    }

    const handleImageChange = (file: File | null, id: number) => {
        updateImage(file, id);
    }

    const handleDeletedImage = () => {
        deleteImage(imageId);
        setOpenModal(false);
    }



    return (
        <Box>
            <Box className="px-[16px]">
                <AddImageButton text={text} imageChanged={(file) => handleAddedImage(file)}/>
            </Box>
            <Box className="flex flex-wrap items-start content-center justify-start p-[16px] gap-[16px]">
                {
                    images.map((image, index) => (
                        <Box className="w-[250px] relative" key={index}>
                            <ImageInAlbum
                                classes={{
                                    img: "bg-center bg-cover object-cover  h-[195px] rounded-lg border-2 border-state-500"
                                }}
                                imageChanged={(file) => handleImageChange(file, image.id)}
                                imageDelete={() => handleOpen(image.id)}
                                image={callbackImageUrl(image.url)}
                            ></ImageInAlbum>
                        </Box>
                    ))
                }
            </Box>

            <DeleteModal
                open={openModal}
                onClose={handleClose}
                message="Are you sure you want to delete this image?"
                confirmDelete={handleDeletedImage}
            ></DeleteModal>
        </Box>

    );
}

export default Album;
