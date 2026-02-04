import React, {useState, useEffect} from "react";
import {Container} from "typedi";
import FileService from "@/Services/FileService/FileService";
import "reflect-metadata";
const useImageHook = (imageFile: File | null) => {
    const fileService = Container.get(FileService);
    // const [image, setImage] = useState<File | null>(null);
    const [assertImage, setAssertImage] = useState<boolean>(false);
    // const [imageDirty, setImageDirty] = useState<boolean>(false);
    useEffect(() => {
        setAssertImage(fileService.assertImage(imageFile));
    }, [imageFile]);
    // console.log(assertImage);

    return assertImage;
}

export default useImageHook;
