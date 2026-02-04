import React, {ChangeEvent, MouseEventHandler, useEffect, useRef, useState} from "react";
import {Container} from "typedi";
import FileService from "@/Services/FileService/FileService";
import useImageHook from "@/Hooks/ImageHook";
import {
    Avatar,
    Box,
    CardMedia,
    FormHelperText,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem
} from "@mui/material";
import CustomIcon from "@/Components/Icon/Icon";
import AlbumImageProps from "@/Interfaces/AlbumImageProps";

const ImageInAlbum : React.FC<AlbumImageProps> = (
    {
        className = 'relative',
        classes='',
        // callback = (image: File | null) => {},
        image = null,
        imageChanged,
        imageDelete,
    }
) => {

    const [imageProp, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const fileService = Container.get(FileService);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // ==========================================================================================
    // Handle Menu:

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleUpdate = () => {
        inputRef.current?.click();
        handleClose();
    };

    // ==========================================================================================
    // Handle Image:


    const assertImage = useImageHook(imageProp);
    // const handleClick = () => {
    //     inputRef?.current?.click();
    // }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event && event.target) {
            if (!fileService.assertSize(event.target?.files?.[0] as File)) {
                setError('Image Size must be less than 200KB!');
            } else if (!fileService.assertImage(event.target?.files?.[0] as File)) {
                setError('Please upload an image!');
            } else {
                setError('');
                imageChanged(event.target?.files?.[0] as File);
            }
        }
        // if (event && event.target &&
        //     fileService.assertImage(event.target?.files?.[0] as File) &&
        //     fileService.assertSize(event.target?.files?.[0] as File)) {
        //     imageChanged(event.target?.files?.[0] as File);
        // }
    }

    // ==========================================================================================
    // Handle Delete:
    const handleDelete = () => {
        imageDelete();
        handleClose();
    }
    // ==========================================================================================


    return (
        <Box>
            <CardMedia
                classes={classes}
                component="img"
                src={(assertImage && imageProp) ? URL.createObjectURL(imageProp) : (image || fileService.DefaultImage)}
                alt="photo"
                className={className}
            />
            <Box className="absolute top-[16px] right-[16px] rounded-full">
                <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.52)' }}>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{color: 'white'}}
                    >
                        <CustomIcon name="vertical-dots"></CustomIcon>
                    </IconButton>
                </Avatar>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleUpdate}
                    >
                        <ListItemIcon >
                            <CustomIcon name="edit"></CustomIcon>
                        </ListItemIcon>
                        <ListItemText>Update</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <CustomIcon name="delete"></CustomIcon>
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>

            <input type="file"
                   id="hidden-input"
                   className="hidden"
                   ref={inputRef}
                   onChange={handleChange}
            />

            {error && <FormHelperText
                sx={{
                    color: 'error.main',
                    marginLeft: '8px',
                    marginRight: '8px',
                    textWrap: 'nowrap',
                }}
            >
                {error}
            </FormHelperText>}
        </Box>
    );

}

export default ImageInAlbum;
