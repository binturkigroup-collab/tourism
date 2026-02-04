import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {styled} from "@mui/material/styles";
import {Box, BoxProps, Typography} from "@mui/material";
import styles from "./styles.module.scss";
import {usePage} from "@inertiajs/react";

const Vision: React.FC<{block: BlockProps}> = ({block}) => {
    const lang = usePage().props.lang;
    const ImageStyle = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        width: '100%',
        height: '100%',
        // borderRadius: '15px',
        minHeight: '190px',
        overflow: 'hidden',
        '&:before' : {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            // borderRadius: '15px',
            backgroundImage: `url(/file/blocks/${block.images[0].url})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // filter: 'grayscale(0.9)',
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
        <Box className="">
            <Box className="w-[70%] min-w-[350px] h-[350px] mx-auto relative">
                <ImageStyle />
                <Box className={`${styles.visionShadow} absolute p-[8px] top-0 right-0 bottom-0 left-0 w-full h-full`}>
                    <Box className={`${styles.content} ${styles.vertStyle}`}>
                        <Box className={`${styles.horStyle}`}>
                            <Box className={`${styles.horStyle}`}>
                                <Box className="p-[16px]">
                                    <Typography
                                        variant="h3"
                                        align={lang === 'ar' ? 'right': 'left'}
                                        sx={{fontWeight: 'bold', fontSize:{xs: '1.5rem', md: '3rem'} }}
                                        // className={styles.textColor}
                                    >{block.title}</Typography>
                                </Box>

                                <Box className="p-[16px]">
                                    <Typography
                                        component="p"
                                        variant="body2"
                                        color="white"
                                        dangerouslySetInnerHTML={{__html: block.description}}
                                    ></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>
    );
};

export default Vision;
