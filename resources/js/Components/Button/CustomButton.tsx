import React from "react";
import IButtonProps from "@/Interfaces/IButtonProps";
import {Button, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import ReorderIcon from '@mui/icons-material/Reorder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {purple, lime} from "@mui/material/colors";
import {useTranslation} from "react-i18next";


// type ButtonProps = {
//     task: string,
//     text?: string,
//     disabled?: boolean,
//
// }
const CustomButton: React.FC<IButtonProps> = ({
          task, text = '', disabled = false,
          type="submit", ...props}) => {
    const { t } = useTranslation();

    switch (task) {
        case 'add' : {
            return (
                <Button
                    {...props}
                    type={type}
                    size="small"
                    variant="contained"
                    color="secondary"
                    disabled={disabled}
                    startIcon={<AddIcon/>}>
                    <Typography variant={'body2'}>Add {text}</Typography>
                </Button>
            );
        }

        case 'send' : {
            return (
                <Button
                    {...props}
                    type={type}
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                    startIcon={<SendIcon />}
                    // endIcon={<SendIcon />}
                >

                    <Typography variant={'body2'} className="px-[5px]">{t('send')} {text}</Typography>
                </Button>
            );
        }

        case 'update' : {
            return (
                <Button
                    {...props}
                    type={type}
                    size="small"
                    variant="contained"
                    color="secondary"
                    disabled={disabled}
                    startIcon={<ChangeCircleOutlinedIcon />}>
                    <Typography variant={'body2'}>Update {text}</Typography>
                </Button>
            );
        }

        case 'display' : {
            return (
                <Button
                    {...props}
                    size="small"
                    variant="contained"
                    color="info"
                    // sx={{bgcolor: lime[900]}}
                    startIcon={<SmartDisplayOutlinedIcon />}>
                    <Typography variant={'body2'}>View {text}</Typography>
                </Button>
            );
        }

        case 'delete' : {
            return (
                <Button
                    {...props}
                    type="button"
                    size="small"
                    variant="contained"
                    color="error"
                    disabled={disabled}
                    startIcon={<DeleteOutlineOutlinedIcon />}>
                    <Typography variant={'body2'}>Delete {text}</Typography>
                </Button>
            );
        }

        case 'generate' : {
            return (
                <Button
                    {...props}
                    type="button"
                    size="small"
                    variant="contained"
                    color="primary"
                    disabled={disabled}
                    startIcon={<AutoFixNormalIcon />}>
                    <Typography variant={'body2'}>Generate {text}</Typography>
                </Button>
            );
        }

        case 'reorder' : {
            return (
                <Button
                    {...props}
                    type="button"
                    size="small"
                    variant="contained"
                    color="secondary"
                    disabled={disabled}
                    startIcon={<ReorderIcon />}>
                    <Typography variant={'body2'}>Reorder {text}</Typography>
                </Button>
            );
        }

        case 'back' : {
            return (
                <Button
                    {...props}
                    type="button"
                    size="small"
                    variant="contained"
                    color="error"
                    disabled={disabled}
                    startIcon={<ArrowBackIosIcon />}>
                    <Typography variant={'body2'}>Back {text}</Typography>
                </Button>
            );
        }

        case 'fetch' : {
            return (
                <Button
                    {...props}
                    size="small"
                    variant="contained"
                    color="info"
                    type={type}
                    // sx={{bgcolor: lime[900]}}
                    startIcon={<SmartDisplayOutlinedIcon />}>
                    <Typography variant={'body2'}>View {text}</Typography>
                </Button>
            );
        }

        default: {
            return (
                <Button
                    {...props}
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}>
                    <Typography>Add {text}</Typography>
                </Button>
            );
        }
    }
}

export default CustomButton;
