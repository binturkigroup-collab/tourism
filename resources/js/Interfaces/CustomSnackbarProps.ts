import {SnackbarProps} from "@mui/material";

interface CustomSnackbarProps extends SnackbarProps {
    message: string;
    severity: "success" | "error";
}

export default CustomSnackbarProps;
