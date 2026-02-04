import React, {useRef} from 'react';
import styles from "./styles.module.scss";
import {useTranslation} from "react-i18next";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Box, Typography, Container, Button} from "@mui/material";
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";
import {CSSRulePlugin} from "gsap/CSSRulePlugin";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link, usePage} from "@inertiajs/react";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC<{blocks: BlockProps []}> = ({blocks}) => {
    const image = blocks[0].images[0].url;
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const imgRef = useRef(null);
    const lang = usePage().props.lang;


    useGSAP(() => {
        // gsap.timeline()
        //     .from(titleRef.current, {
        //     scale: 0.7,
        //     duration: 1,
        //     ease: Power3.easeOut,
        //     scrollTrigger: {
        //         trigger: titleRef.current,
        //         toggleActions: "restart none none none",
        //         scrub: true,
        //     },
        // })
        //     .from(descriptionRef.current, {
        //         opacity: 0.2,
        //         // x: -100,
        //         duration: 1.2,
        //         ease: Power3.easeOut,
        //         scrollTrigger: {
        //             trigger: descriptionRef.current,
        //             toggleActions: "restart none none none",
        //             scrub: true,
        //         }
        //     })
        //     .from(imgRef.current, {
        //         scale: .7,
        //         y: -40,
        //         duration: 1.4,
        //         ease: Power3.easeOut,
        //         scrollTrigger: {
        //             trigger: imgRef.current,
        //             toggleActions: "restart none none none",
        //             scrub: true,
        //         }
        //     })
    }, {scope: containerRef})

    return (
        <Box ref={containerRef} className="m-[16px]">
            <Box ref={titleRef} className={`${styles.aboutContainer}`}>
                {/*<Link href={`/${lang}/block/about-us`}>*/}
                {/*    <SectionTitle title={t('about-us')} className="about-us-title"></SectionTitle>*/}
                {/*</Link>*/}
                <Box className={`${styles.imgContainer} w-fit mx-auto`}>
                    <Box className={`my-[32px] p-[16px] w-fit mx-auto ${styles.imgBorder}`} ref={imgRef}>
                        <img src={`/file/blocks/${image}`} alt=""/>
                    </Box>
                    <Container ref={descriptionRef}>
                        <Box className={`styled-list ${styles.textAria}`}>
                            <Typography
                                component="p"
                                variant="body2"
                                dangerouslySetInnerHTML={{__html: blocks[0].brief}}
                                className={`${styles.brief} ${styles.clamp}`}
                            ></Typography>
                            <Box className="flex justify-center p-[16px]">
                                <Link href={`/${lang}/block/about-us`}>
                                    <Button color="secondary" variant="contained">{t('more')}</Button>
                                </Link>
                            </Box>
                        </Box>

                    </Container>
                </Box>
            </Box>
            {/*<Container ref={descriptionRef}>*/}
            {/*    <Box className="styled-list" dangerouslySetInnerHTML={{__html: blocks[0].description}}></Box>*/}
            {/*</Container>*/}

        </Box>
    );
};

export default About;
