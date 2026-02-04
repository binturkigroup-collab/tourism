import {ButtonProps} from "@mui/material/Button";

interface IButtonProps extends ButtonProps {
    task: string;
    text?: string;
}

export default IButtonProps;
