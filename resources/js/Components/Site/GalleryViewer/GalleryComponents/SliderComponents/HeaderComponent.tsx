import React from 'react';
import {useGalleryContext} from "@/Components/Site/GalleryViewer/Context/GalleryContext";
import {
    Box,
    IconButton,
    Stack,
} from "@mui/material";
import Icon from "@/Components/Icon/Icon";
import {useSliderContext} from "@/Components/Site/GalleryViewer/Context/SliderContext";

const HeaderComponent = () => {
    const {closeViewer} = useGalleryContext()
    const {controls, setControls, changeAutoPlay, zoomIn, zoomOut, changeMap} =
        useSliderContext();

    React.useEffect(() => {

    }, [console, setControls]);
    return (
        <Box className="p-[16px]">
            <Stack
                direction="row"
                alignItems="ceneter"
                justifyContent="flex-end"
                spacing={1}
            >
                <IconButton title="Zoom In" onClick={() => zoomIn()}>
                    <Icon name="zoom-in"></Icon>
                </IconButton>
                <IconButton title="Zoom Out" onClick={() => zoomOut()}>
                    <Icon name="zoom-out"></Icon>
                </IconButton>
                <IconButton title="Full Screen" onClick={() => changeMap(true)}>
                    <Icon name="map-out"></Icon>
                </IconButton>
                <IconButton title="Normal Screen" onClick={() => changeMap(false)}>
                    <Icon name="map-in"></Icon>
                </IconButton>
                <IconButton title="Auto Play" onClick={() => changeAutoPlay()}>
                    {
                        controls.autoplay? <Icon name="stop"></Icon> : <Icon name="play"></Icon>
                }
                </IconButton>
                <IconButton onClick={closeViewer}>
                    <Icon name="close"></Icon>
                </IconButton>
            </Stack>
            {/*<button onClick={closeViewer}>Close FROM HEADER</button>*/}
        </Box>
    );
};

export default HeaderComponent;
