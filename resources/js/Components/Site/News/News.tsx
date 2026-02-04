import React, {useRef} from 'react';
import Blocks from "@/Interfaces/Site/Blocks";
import {useTranslation} from "react-i18next";
import {Link, usePage} from "@inertiajs/react";
import {Box, Container, Stack} from "@mui/material";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import NewsCard from "./NewsCard";
import {Swiper, SwiperProps, SwiperRef, SwiperSlide} from 'swiper/react';
import {A11y, Autoplay, Navigation, Pagination, Scrollbar, Virtual} from 'swiper/modules';
import styles from "./styles.module.scss";

const News: React.FC<Blocks> = ({blocks}) => {
    const { t } = useTranslation();
    const progressCircle = useRef<any>(null);
    const progressContent = useRef<any>(null);
    const lang = usePage().props.lang;
    // const onAutoplayTimeLeft = (s: SwiperClass, time: number, progress: number) => {
    //     if (progressCircle.current) {
    //
    //         progressCircle.current.style.setProperty('--progress', String(1 - progress));
    //     }
    //
    //     if (progressContent.current) {
    //         progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    //     }
    // };

    return (
        <Box>
            <Box className="relative">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y, Virtual]}
                    slidesPerView={1}
                    autoplay={true}
                    virtual={true}
                    className={styles.cardContainer}
                >
                    {blocks.map((slider, key) => (
                        <Container
                            maxWidth="xl"
                            component="div"
                            sx={{position: 'relative'}}
                            key={key + '-' + slider.title}
                        >
                            <SwiperSlide className={styles.swiperSlide} key={key + '-' + slider.title} virtualIndex={key}>
                                <Link href={`/${lang}/block/details/news/${slider.id}`}>
                                    <NewsCard block={slider} index={key}></NewsCard>
                                </Link>
                            </SwiperSlide>
                        </Container>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};

export default News;
