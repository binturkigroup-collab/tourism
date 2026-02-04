import React from 'react';
import {FormHelperText} from "@mui/material";
import {useImageContext} from "@/Components/images/ImagesWithInput/Context/UseImageContext";

const ErrorMessage = () => {
    const {error} = useImageContext();
    return (
        error && <FormHelperText
            sx={{
                color: 'error.main',
                marginLeft: '8px',
                marginRight: '8px',
                textWrap: 'nowrap',
            }}
        >
            {error}
        </FormHelperText>
    );
};

export default ErrorMessage;
