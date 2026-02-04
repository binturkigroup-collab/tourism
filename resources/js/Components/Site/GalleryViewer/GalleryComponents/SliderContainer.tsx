import React from 'react';
import {useGalleryContext} from "@/Components/Site/GalleryViewer/Context/GalleryContext";
import {Box, Backdrop} from "@mui/material";
import styles from "../styles.module.scss";
import {gsap, Power3} from "gsap";
import HeaderComponent from "@/Components/Site/GalleryViewer/GalleryComponents/SliderComponents/HeaderComponent";
import Slider from "@/Components/Site/GalleryViewer/GalleryComponents/SliderComponents/Slider";
import {SliderProvider} from "@/Components/Site/GalleryViewer/Context/SliderContext";
const SliderContainer: React.FC = () => {
    const { open, closeViewer} = useGalleryContext();

    const containerRef = React.useRef(null);
    const layoutRef = React.useRef(null);

    const [controls, setControls] = React.useState<
        {
            autoplay: boolean,
            zoom: number,
            mapIn: boolean,
        }
    >({
        autoplay: false,
        zoom: 1,
        mapIn: false,
    })

    const changeAutoPlay = () => {
        setControls(controls => {
            return {...controls, autoplay: !controls.autoplay}
        });
    }

    const zoomIn = () => {
        if (controls.zoom < 1.5) {
            setControls(controls => {
                return {...controls, zoom: controls.zoom + .1};
            })
        }
    }

    const zoomOut = () => {
        if (controls.zoom > 1) {
            setControls(controls => {
                return {...controls, zoom: controls.zoom - .1};
            })
        }
    }

    const changeMap = (value: boolean) => {
        setControls(controls => {
            return {...controls, mapIn: value}
        });
    }

    const closing = React.useCallback(() => {
        gsap.timeline()
            .to(layoutRef.current, {
                duration: 0.7,
                height: 0,
                opacity: 0,
                ease: Power3.easeInOut,
            })
            .to(layoutRef.current, {
                visibility: "hidden",
            });
    }, [open]);

    const opening = React.useCallback(() => {
        gsap.timeline()
            .to(layoutRef.current, {
                visibility: "visible",
                duration: 0.5,
                height: 'fit-content',
                opacity: 1,
                ease: Power3.easeInOut,
        })
    }, [open]);

    const expand = React.useCallback(() => {
        gsap.timeline()
            .to(layoutRef.current, {
                position: 'fixed',
                width: '100vw',
                ease: Power3.easeInOut,
                duration: 0.2,
            }).to(layoutRef.current, {
                height: '100vh',
                zIndex: 10001,
                ease: Power3.easeInOut,
                duration: 0.2,
        })
    }, [controls]);

    const shrink = React.useCallback(() => {
        gsap.timeline()
            .to(layoutRef.current, {
                position: 'absolute',
                width: '100%',

                ease: Power3.easeInOut,
                duration: 0.2,
            }).to(layoutRef.current, {
                height: '100%',
                ease: Power3.easeInOut,
                duration: 0.2,
        })
    }, [controls])

    React.useMemo(() => {
        if (!open) {
           closing();
           setControls(controls => {return {...controls, autoplay: false, mapIn: false, zoom: 1}});
        } else {
            opening();
        }
    }, [open]);

    React.useMemo(() => {
        if (controls.mapIn) expand();
        if (!controls.mapIn) shrink();
    }, [controls])

    return (
        <Backdrop
            open={open}
            // onClick={closeViewer}
            className="z-[2100]"
        >
            <Box ref={containerRef}>
                <Box className={styles.layout} ref={layoutRef}>
                    <SliderProvider value={{controls, setControls, changeAutoPlay, zoomIn, zoomOut,  changeMap}}>
                        <HeaderComponent></HeaderComponent>
                        <Slider></Slider>
                    </SliderProvider>
                </Box>
            </Box>
        </Backdrop>
    );
};

export default SliderContainer;
