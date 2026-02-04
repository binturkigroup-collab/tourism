import React from 'react';
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {IconButton} from "@mui/material";
import {MenuGridProps} from "../../Interfaces";
import {useMenusContext} from "../LinksContext";

const ActiveForm = (props: MenuGridProps) => {
    const {activate, loading} = useMenusContext();
    const handleClick = () => {
        if (activate) {
            activate(props.id, !props.isActive);
        }
    }
    return (
        <IconButton onClick={handleClick} disabled={loading}>
            <Brightness1Icon color={props.isActive? "activate": "deactivate"}></Brightness1Icon>
        </IconButton>
    );
};

export default ActiveForm;
