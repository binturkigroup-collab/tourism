import React, {useRef} from 'react';
import styles from "./styles.module.scss"
import {useTranslation} from "react-i18next";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Box, Grid, BoxProps,} from "@mui/material"
import MissionCard from "@/Components/Site/Mission/MissionCard";

import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";
import {CSSRulePlugin} from "gsap/CSSRulePlugin";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Vision from "./Vision";
import Staff from "./Staff";

import {styled} from "@mui/material/styles";

gsap.registerPlugin(ScrollTrigger);

const Mission: React.FC<{blocks: BlockProps []}> = ({blocks}) => {
    const { t } = useTranslation();

    const containerRef = useRef(null);
    const itemRef = useRef([] as (HTMLDivElement | null) []);
    itemRef.current = [];

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !itemRef.current.includes(el)) {
            itemRef.current.push(el);
        }
    }

    useGSAP(() => {
        // itemRef.current.forEach((el, index) => {
        //     gsap.from(el, {
        //         opacity: 0,
        //         duration: 1,
        //         scale: 0.5,
        //         y: 20,
        //         // x: -100,
        //         ease: Power3.easeOut,
        //         stagger: 0.5,
        //         // delay: index * 0.3,
        //         scrollTrigger: {
        //             trigger: el,
        //             // start: 'top bottom-=100',
        //             toggleActions: "restart none none none",
        //             scrub: true,
        //         }
        //     })
        // })
    }, {scope: containerRef});

    return (
        <Box className="m-[16px]" ref={containerRef}>
            {/*<SectionTitle title={t('our-missions')}></SectionTitle>*/}
            {/*<Grid*/}
            {/*    container*/}
            {/*    spacing={2}*/}
            {/*    // direction="column"*/}
            {/*    justifyContent="center"*/}
            {/*    alignItems="center"*/}
            {/*>*/}
            {/*{*/}
            {/*    blocks.map((block, key) => (*/}
            {/*        <Grid*/}
            {/*            item*/}
            {/*            // columns={{xs: 12, md: 6}}*/}
            {/*            xs={12}*/}
            {/*            md={key === blocks.length - 1 ? 12 : 6}*/}
            {/*            key={key}*/}
            {/*            // className="item"*/}
            {/*            ref={(el) => addToRefs(el)}*/}
            {/*        >*/}
            {/*            <MissionCard block={block}></MissionCard>*/}
            {/*        </Grid>*/}
            {/*    ))*/}
            {/*}*/}
            {/*</Grid>*/}
            <Vision block={blocks[1]}></Vision>
            <Box className="my-[16px]"></Box>
            <Staff block={blocks[2]}></Staff>
        </Box>
    );
};

export default Mission;
