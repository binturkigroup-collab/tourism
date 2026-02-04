import React, {CSSProperties, useState} from 'react';
import styles from "./styles.module.scss";

import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import {ClipLoader, ClockLoader} from "react-spinners";

const ClockSpinner = () => {
    const spinner = useAppSelector(state => state.spinner.spinner);
    let [color, setColor] = useState("#009688");

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "#009688",
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        alignSelf: "center",
    };
    return (
        <div className={styles.spinnerContainer}>
            <ClockLoader
                color={color}
                loading={spinner}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default ClockSpinner;
