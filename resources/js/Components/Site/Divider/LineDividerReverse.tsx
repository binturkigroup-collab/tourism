import React, {useRef} from 'react';
import styles from "./styles.module.scss";
import {gsap, Power3} from "gsap";
import {useGSAP} from "@gsap/react";
import {CSSRulePlugin} from "gsap/CSSRulePlugin";

const LineDividerReverse = () => {
    const containerRef = useRef(null);
    const point = CSSRulePlugin.getRule(`.${styles.lineDividerReverse}:after`);

    useGSAP(() => {
        // gsap.timeline()
        //     .to(containerRef.current, {
        //         visibility: "visible",
        //         duration: .1,
        //         ease: Power3.easeOut,
        //     })
        //     .to(point, {
        //         reversed: false,
        //         right: '100%',
        //         duration: 0.3,
        //         ease: Power3.easeInOut,
        //         scrollTrigger: {
        //             trigger: containerRef.current,
        //             start: 'center 80%',
        //             end: "center 35%",
        //             toggleActions: "restart none none none",
        //             scrub: true,
        //         }
        //     })
    },  {})

    return (
        <div className={styles.lineDividerReverse} ref={containerRef}>

        </div>
    );
};

export default LineDividerReverse;
