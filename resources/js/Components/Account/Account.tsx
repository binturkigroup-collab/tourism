import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {
    Avatar,
    Button,
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    ListItemText,
    Box,

} from "@mui/material";
import {grey} from "@mui/material/colors";
import CustomIcon from "@/Components/Icon/Icon";
import {Link, useForm} from "@inertiajs/react";
import UploadImage from "@/Components/UploadImage/UploadImage";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";

const Account = () => {
    //TODO: change CustomIcon with UploadImage
    const {post} = useForm();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const user = useAppSelector(state => {
        return state.user.user
    });

    const logout = () => {
        post(route('logout'));
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {

    }, [])
    return (
        <div>
            <Avatar sx={{ bgcolor: grey[500] }}>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{color: 'white'}}
                >
                    {/*<CustomIcon name="account"></CustomIcon>*/}
                    <Box className="h-[40px] w-[40px] rounded-full flex justify-center items-center">
                        {/*<UploadImage image={user.avatar} className="h-[40px] w-[40px] rounded-full"/>*/}
                        <CustomIcon name="account"/>
                    </Box>
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
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                >
                    <ListItemIcon>
                        <CustomIcon name="account"></CustomIcon>
                    </ListItemIcon>
                    {/*<Link href={route('profile.edit')}>Profile</Link>*/}
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <CustomIcon name="logout"></CustomIcon>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Account;
