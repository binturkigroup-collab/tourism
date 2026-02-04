import React from 'react';
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {IconButton} from "@mui/material";
import {BlockGridProps} from "../../Interfaces";
import {useBlocksContext} from "../BlocksContext";

const ActiveForm = (props: BlockGridProps) => {
    const {activate, loading} = useBlocksContext();
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
