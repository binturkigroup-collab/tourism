import React from 'react';
import styles from "./styles.module.scss";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Container, Typography, Box, BoxProps} from "@mui/material";
import {styled} from "@mui/material/styles";
const MissionCard: React.FC<{block: BlockProps}> = ({block}) => {

    const ImageStyle = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        width: '325px',
        height: '421px',
        borderRadius: '15px',
        minHeight: '190px',
        overflow: 'hidden',
        '&:before' : {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '15px',
            backgroundImage: `url(/file/blocks/${block.images[0].url})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(0.9)',
            transform: 'scale(1)',
            transition: 'all 0.3s ease-in-out',
        },
        '&:hover' : {
            '&:before': {
                transform: 'scale(1.05)',
            }
        }
    })

    return (
        <Box className={`p-[16px] m-[16px] ${styles.bgColor} ${styles.borderRadius}`}>
            {/*<Typography className={`relative ${styles.textOverlay}`}>{block.description}</Typography>*/}
            <Box className="relative h-full">
                <Box className={`styled-list p-[16px] ${styles.textOverlay}`} dangerouslySetInnerHTML={{__html: block.description}}></Box>
            </Box>
        </Box>
    );
};

export default MissionCard;
