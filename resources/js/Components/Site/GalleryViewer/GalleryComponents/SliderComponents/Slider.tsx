import React from 'react';
import {useGalleryContext} from "@/Components/Site/GalleryViewer/Context/GalleryContext";
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';
import {Box, Container, Typography} from "@mui/material";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import styles from "../../styles.module.scss";
import {Swiper as SwiperClass} from "swiper/types";
import {useSliderContext} from "@/Components/Site/GalleryViewer/Context/SliderContext";
import SwiperCore from 'swiper';
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";


const Slider: React.FC = () => {
    SwiperCore.use([Autoplay]);
    const {album, uri} = useGalleryContext();
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null);
    const swiperRef = React.useRef<SwiperRef | null>(null);
    const containerRef = React.useRef(null);

    const zoomImg = () => {
        gsap.timeline()
            .to('.zoom-img', {
                transform: `scale(${controls.zoom})`,
                duration: .1,
                ease: Power3.easeInOut,
            })
    }

    const {contextSafe} = useGSAP({scope: containerRef});

    const {controls, setControls} = useSliderContext();
    React.useEffect(() => {
        if (swiperRef && controls.autoplay) swiperRef.current?.swiper.autoplay.start();
        zoomImg();
    }, [controls, setControls]);
    return (
        <Box ref={containerRef}>
            <Swiper
                ref={swiperRef}
                modules={[FreeMode, Navigation, Pagination, Thumbs, Autoplay]}
                className={styles.mySwiper2}
                spaceBetween={10}
                navigation={true}
                pagination={{
                    type: 'fraction',
                }}
                thumbs={{ swiper: thumbsSwiper }}
                centeredSlides={true}
                autoplay={ controls.autoplay ? {
                        delay: 2500,
                        disableOnInteraction: false,
                    } : false}
                loop={true}
            >
                {album.map((slider, key) => (
                    <Container
                        maxWidth="xl"
                        component="div"
                        sx={{position: 'relative'}}
                        key={slider.id + '-' + key}
                    >
                        <SwiperSlide className={styles.swiperSlide2} key={slider.id + '-main-partial-' + key}>
                            <Box className= {styles.imgContainer}>
                                <img className="zoom-img" src={`${uri + slider.url}`} alt={slider.name}/>
                                <Box component="div"
                                >

                                </Box>
                            </Box>
                        </SwiperSlide>
                    </Container>
                ))}
            </Swiper>

            {/*<Swiper*/}
            {/*    onSwiper={ (swiper) => setThumbsSwiper(swiper)}*/}
            {/*    spaceBetween={10}*/}
            {/*    slidesPerView={4}*/}
            {/*    freeMode={true}*/}
            {/*    watchSlidesProgress={true}*/}
            {/*    modules={[FreeMode, Navigation, Thumbs]}*/}
            {/*    className={styles.mySwiper}*/}
            {/*>*/}
            {/*    {album.map((slider, key) => (*/}
            {/*        <Container*/}
            {/*            maxWidth="xl"*/}
            {/*            component="div"*/}
            {/*            sx={{position: 'relative'}}*/}
            {/*            key={slider.id + '-thumb-' + key}*/}
            {/*        >*/}
            {/*            <SwiperSlide className={styles.swiperSlide} key={slider.id + '-thumb-partial-' + key}>*/}
            {/*                <Box className= {styles.imgContainer}>*/}
            {/*                    <img src={`${uri + slider.url}`} alt={slider.name}/>*/}
            {/*                    <Box component="div"*/}
            {/*                    >*/}
            {/*                    </Box>*/}
            {/*                </Box>*/}
            {/*            </SwiperSlide>*/}
            {/*        </Container>*/}
            {/*    ))}*/}
            {/*</Swiper>*/}
        </Box>
    );
};

export default Slider;
