import Styles from "./Styles";
import {Box,
    Popover,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Paper,
    Divider,
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import PopoverMenuProps from "@/Interfaces/Site/PopoverMenuProps";
import {slugify} from "@/Services/Helper";
// import {useOutsideClick} from "@headlessui/react/dist/hooks/use-outside-click";
import useClickOutsideArea from "@/Hooks/ClickOutsideArea/useClickOutsideArea";
import {Link, usePage} from "@inertiajs/react";
const NavbarMenu:React.FC<PopoverMenuProps> = ({
    menuLink,
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const ref = useRef();
    const {visible, setVisible} = useClickOutsideArea(ref, false);
    const lang = usePage().props.lang;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // setAnchorEl(event.currentTarget);
        setVisible(true);
    };

    const handleClose = () => {
        // setAnchorEl(null);
        setVisible(false);
    };

    const open = Boolean(anchorEl);
    const id = open ? slugify(menuLink.name) : undefined;
    return (
        <Box ref={ref} sx={{position: 'relative'}}>
            <Button
                sx={{color: 'inherit'}}
                aria-describedby={id}
                aria-controls={open ? id : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {menuLink.name}
            </Button>

            {visible &&
                <Paper
                    elevation={3}
                    sx={{position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, width: '250px'}}
                    className="text-zinc-700 text-start"
                >
                    <List dense={true}>
                        {menuLink.children.map((child, index) => (
                            <Link href={`/${lang}${child.url}`} key={index}>
                                <ListItemButton
                                >
                                    <ListItemText
                                        className="text-start"
                                        primary={child.name} />
                                </ListItemButton>
                                <Divider component="li" variant="middle"/>
                            </Link>

                        ))}

                    </List>
                </Paper>
            }

            {/*<Box*/}
            {/*    component="div"*/}
            {/*    sx={{position: 'absolute', top: '100%', left: 0, zIndex: 10}}*/}
            {/*>*/}
            {/*    */}
            {/*    {*/}
            {/*        visible && <Box sx={{color: '#333'}}>HERE is Mega Menu</Box>*/}
            {/*    }*/}
            {/*</Box>*/}

            {/*<Popover*/}
            {/*    id={id}*/}
            {/*    open={open}*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    onClose={handleClose}*/}

            {/*    anchorOrigin={{*/}
            {/*        vertical: 'bottom',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*    transformOrigin={{*/}
            {/*        vertical: 'top',*/}
            {/*        horizontal: 'center',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>*/}
            {/*</Popover>*/}
        </Box>


    );
}

export default NavbarMenu;
