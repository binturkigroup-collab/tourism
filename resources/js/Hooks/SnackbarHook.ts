import React, {useState, useEffect} from "react";

type SnackbarType = {
    open: boolean,
    message: string,
    severity: "success" | "error",
}

const useSnackbarHook = (status: {open: boolean, message: string, severity: "success" | "error"}) => {
    const [snackbar, setSnackbar] = useState<SnackbarType>({
        open: false,
        message: '',
        severity: "success",
    })

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway' || reason === 'timeout' || reason === 'escapeKeyDown') {
            setSnackbar(snackbarState =>
                ({ ...snackbarState, open: false, message: '' } )
            );
            return;
        }
        setSnackbar(snackbarState =>
            ({ ...snackbarState, open: false, message: '' } )
        );
    };

    return {snackbar, setSnackbar, handleClose};
}

export default useSnackbarHook;
