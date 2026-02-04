import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import "reflect-metadata";
import {BlockGridProps} from "../../Interfaces";

const ImageTemplate = (props: BlockGridProps) => {
    return (
        <ListItem sx={{padding: 0}}>
            <ListItemAvatar>
                <Avatar src={props.avatar} />
            </ListItemAvatar>
            <ListItemText primary={props.name} secondary={props.createdAt} />
        </ListItem>
    );
};

export default ImageTemplate;
