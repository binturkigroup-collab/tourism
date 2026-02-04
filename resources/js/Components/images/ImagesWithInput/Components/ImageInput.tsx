import React, {ChangeEvent} from 'react';
import styles from "./styles.module.scss";
import {useImageContext} from "@/Components/images/ImagesWithInput/Context/UseImageContext";

const ImageInput = () => {

    const {inputRef, callback} = useImageContext();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        callback(event?.target?.files?.[0] || null);
    }

    return (
        <input type="file"
               id="hidden-input"
               className="hidden"
               ref={inputRef}
               onChange={handleChange}
        />
    );
};

export default ImageInput;
