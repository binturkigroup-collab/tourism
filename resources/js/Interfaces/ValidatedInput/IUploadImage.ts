import React from "react";

interface UploadedImageProps{
    image?: string | null;
    className?: string;
    classes?: string;
}

export interface UploadImagePropsWithInput extends UploadedImageProps {
    image?: string | null;
    className?: string;
    classes?: string;
    callback: (image: File | null) => void,
    imageChanged: () => void,
}

export default UploadedImageProps;

