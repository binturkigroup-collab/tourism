import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from  "./styles.module.scss";
import React, {useRef} from "react";
import {SwiperClass} from "swiper/react";
import {Swiper, SwiperProps, SwiperRef, SwiperSlide} from 'swiper/react';
import {A11y, Autoplay, Navigation, Pagination, Scrollbar} from 'swiper/modules';
import {Box, Container, Typography} from "@mui/material";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {usePage} from "@inertiajs/react";
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";
import {CSSRulePlugin} from "gsap/CSSRulePlugin";
import SplitType from "split-type";


interface HomeSliders {
    mainSliders: BlockProps[],
}
const MainSlider: React.FC<HomeSliders> = ({mainSliders}) => {
    const lang = usePage().props.lang;
    // ========================================================//
    //=================GSAP================//
    const containerRef = useRef(null);

    const animate = (index: number) => {

        // const text = new SplitType(`.text-title-${index}`, {
        //     // absolute: false,
        //     // charClass: "",
        //     // lineClass: "",
        //     // split: undefined,
        //     // splitClass: "",
        //     // tagName: "",
        //     // wordClass: "",
        //     types: 'words,chars',
        // });
        // let stagger = 0.05;
        // if (text && text.chars) stagger = 1 / text.chars.length + 0.07;
        // gsap.timeline()
        //     .from('.char', {
        //         // duration: 0.5,
        //         ease: Power3.easeOut,
        //         opacity: 0,
        //         stagger,
        //         delay: 1,
        //     }).eventCallback(('onComplete'), () => text.revert());

    }

    useGSAP(() => {
        animate(0);
    }, {scope: containerRef});
    // ========================================================//


    return(
        <Box className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                className={styles.swiper}
                // navigation={true}
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                centeredSlides={true}
                onSlideChange={(swiper) => animate(swiper.activeIndex)}
            >
                {mainSliders.map((slider, key) => (
                    <Container
                        maxWidth="xl"
                        component="div"
                        sx={{position: 'relative'}}
                        key={`slider-${Math.random()*10000}-${key}`}
                    >
                        <SwiperSlide className={styles.swiperSlide}>
                            <Box className= {styles.imgContainer} ref={containerRef}>
                                <img src={`/file/blocks/${slider.images[0].url}`} alt={slider.title}/>
                                <Box className={styles.backgroundShadow}>
                                    <Box component="div"
                                         className={`${lang === 'ar' ? styles.arTitleContainer : styles.enTitleContainer} p-[16px]`}
                                    >
                                        <p
                                            className={`${styles.textTitle} text-title-${key} sm:text-2x md:text-4xl font-bold uppercase`}
                                        >
                                            {slider.title}
                                        </p>

                                    </Box>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    </Container>
                ))}
            </Swiper>
        </Box>

    );
}
export default MainSlider;
