import React, {useState} from "react";
import IValidatedImage from "@/Interfaces/ValidatedInput/IValidatedImage";
import {Box, FormHelperText} from "@mui/material";
import UploadImageWithInput from "@/Components/UploadImageWithInput/UploadImageWithInput";
import {Controller} from "react-hook-form";
import ImageContainer from "@/Components/images/ImagesWithInput/ImageContainer";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import FileService from "@/Services/FileService/FileService";

const ValidatedImage : React.FC<IValidatedImage<any>> = ({
        controllerName = '',
        methods,
        image = null,
        onUpload = null,
    }) => {
    const fileService = ServiceContainer.get(FileService);
    const [imageDirty, setImageDirty] = useState<boolean>(false);
    const [imageChanged, setImageChanged] = useState<boolean>(false);

    const handleImageChange = () => {
        setImageChanged(true);
    }

    const getImageInfo = (data: File | null) => {
        setImageDirty(true);
        methods.setValue('image', data);
        if (data) methods.clearErrors('image')
        else methods.setError('image', {message: 'image is required'});

        if(!data && imageDirty) {
            methods.setError('image', {message: 'Select a valid image'})
        }

        else {
            methods.clearErrors('image');
            // if (onUpload !== null && imageChanged) {
            //     onUpload();
            // }

            if (onUpload !== null) {
                onUpload();
            }
        }
        // (!data && imageDirty)
        //     ? methods.setError('image', {message: 'Select a valid image'})
        //     : methods.clearErrors('image');
    }

    return(
        <Controller
            name={controllerName}
            control={methods.control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
                     }) => (
                <>
                    <Box className="w-[250px] relative">
                        {/*<UploadImageWithInput*/}
                        {/*    callback={(image) => {*/}
                        {/*        getImageInfo(image)*/}
                        {/*    }}*/}
                        {/*    image={image}*/}
                        {/*    imageChanged={handleImageChange}*/}
                        {/*    classes="bg-center bg-cover object-cover  h-[195px] rounded-lg border-2 border-state-500"*/}
                        {/*></UploadImageWithInput>*/}
                        <ImageContainer
                            image={image || fileService.DefaultImage}
                            iconClasses="right-[16px] bottom-[16px]"
                            classes="bg-center bg-cover object-cover relative h-[195px] rounded-lg border-2 border-state-500"
                            onChange={getImageInfo}/>
                    </Box>
                    {/*<FormHelperText*/}
                    {/*    sx={{*/}
                    {/*        color: 'error.main',*/}
                    {/*        marginLeft: '8px',*/}
                    {/*        marginRight: '8px',*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {(error?.message) ?? ''}*/}
                    {/*</FormHelperText>*/}
                </>
            )}
        />
    );
}

export default ValidatedImage;
