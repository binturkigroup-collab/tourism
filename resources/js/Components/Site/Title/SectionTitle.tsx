import React from 'react';
import {Box, Typography, TypographyProps} from "@mui/material";
import styles from "./styles.module.scss";

interface TitleProps extends TypographyProps {
    title: string;
}

const SectionTitle:React.FC<TitleProps> = ({title, ...props}) => {
    return (
        <Box
            className="p-[16px]"
        >
            <Typography
                {...props}
                variant="h1"
                align="center"
                sx={{ fontWeight: 'bold', color: '#E02027', fontSize:{xs: '1.5rem', md: '3rem'} }}
                // className={styles.textColor}
            >{title}</Typography>
        </Box>
    );
};

export default SectionTitle;
