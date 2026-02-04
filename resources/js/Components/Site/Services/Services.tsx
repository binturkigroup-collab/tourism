import React, {useRef, useState} from "react";
import styles from "./styles.module.scss"
import Blocks from "@/Interfaces/Site/Blocks";
import {
    Box, Container,
    Typography,
    Stack,
} from "@mui/material";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import {useTranslation} from "react-i18next";
import {Link, usePage} from "@inertiajs/react";
import {Swiper, SwiperProps, SwiperRef, SwiperSlide} from 'swiper/react';
import {A11y, Autoplay, Navigation, Pagination, Scrollbar, EffectFade} from 'swiper/modules';
import {SwiperClass} from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import ServiceCard from "@/Components/Site/Services/ServiceCard";

const Services: React.FC<Blocks> = ({blocks}) => {
    const { t } = useTranslation();
    const progressCircle = useRef<any>(null);
    const progressContent = useRef<any>(null);
    const lang = usePage().props.lang;
    const onAutoplayTimeLeft = (s: SwiperClass, time: number, progress: number) => {
        if (progressCircle.current) {

            progressCircle.current.style.setProperty('--progress', String(1 - progress));
        }

        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    return (
        <Box className="m-[16px]">
            {/*<Typography*/}
            {/*    component="h4"*/}
            {/*    variant="h4"*/}
            {/*    align="center"*/}
            {/*    sx={{fontWeight: 'bold'}}*/}
            {/*>{t('see-what-we-can-do')}</Typography>*/}
            <Link href={`/${lang}/block/services`}>
                <SectionTitle title={t('our-services')} ></SectionTitle>
            </Link>
            <Box className="relative">
                {/*<Swiper*/}
                {/*    modules={[Navigation, Pagination, Autoplay, A11y]}*/}
                {/*    className={styles.swiper}*/}
                {/*    navigation={true}*/}
                {/*    spaceBetween={30}*/}
                {/*    slidesPerView='auto'*/}
                {/*    centeredSlides={false}*/}
                {/*    // pagination={{ clickable: true }}*/}
                {/*>*/}
                {/*    {blocks.map((slider, key) => (*/}
                {/*        <Container*/}
                {/*            maxWidth="xl"*/}
                {/*            component="div"*/}
                {/*            sx={{position: 'relative'}}*/}
                {/*            key={key + '-' + slider.title}*/}
                {/*        >*/}
                {/*            <SwiperSlide className={styles.swiperSlide} key={key + '-' + slider.title}>*/}
                {/*                <Link href={`/${lang}/block/details/services/${slider.id}`}>*/}
                {/*                    <ServiceCard block={slider} index={key}></ServiceCard>*/}
                {/*                </Link>*/}
                {/*            </SwiperSlide>*/}
                {/*        </Container>*/}
                {/*    ))}*/}
                {/*</Swiper>*/}
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                    spacing={3}
                >
                    {
                        blocks.map((slider, key) =>
                            (<Link href={`/${lang}/block/details/services/${slider.id}`}>
                                <ServiceCard block={slider} index={key}></ServiceCard>
                            </Link>
                            ))
                    }

                </Stack>
            </Box>
        </Box>
    );
};

export default Services;
