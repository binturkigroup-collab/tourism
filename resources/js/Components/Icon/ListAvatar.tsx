import React from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from "@mui/material"
import ImageIcon from '@mui/icons-material/Image';
import ListAvatarProps from "@/Interfaces/ListAvatarProps";

const ListAvatar : React.FC<ListAvatarProps> = ({
    primary,
    secondary,
    imageFile,
                                                }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={imageFile}>
                    {/*<ImageIcon />*/}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
    );
}

export default ListAvatar;
