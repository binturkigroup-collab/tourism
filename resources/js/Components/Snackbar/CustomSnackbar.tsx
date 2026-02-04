import React, {useEffect} from "react";
import {Button, IconButton, Snackbar} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CloseIcon from "@mui/icons-material/Close";
import CustomSnackbarProps from "@/Interfaces/CustomSnackbarProps";
import {grey} from "@mui/material/colors";

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
       message,
       open,
       onClose,
        severity,
   }) => {

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Snackbar
            open={open}
            autoHideDuration={2000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            onClose={onClose}
            message={message}
        />
            // {/*<Alert severity={severity} sx={{ width: '100%', color: grey[50] }}>*/}
            // {/*    {message}*/}
            // {/*</Alert>*/}
        // </Snackbar>
    );
}

export default CustomSnackbar;
