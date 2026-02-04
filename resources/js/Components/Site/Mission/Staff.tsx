import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {styled} from "@mui/material/styles";
import {Box, BoxProps, Typography} from "@mui/material";
import SectionTitle from "@/Components/Site/Title/SectionTitle";
import styles from "./styles.module.scss";
import {usePage} from "@inertiajs/react";

const Staff: React.FC<{block: BlockProps}> = ({block}) => {
    //It should be changed here and ".shadow" class in ".scss" file
    const lang = usePage().props.lang;
    const ImageStyle = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        // width: '325px',
        height: '521px',
        // borderRadius: '15px',
        // minHeight: '190px',
        clipPath: `polygon(
                    0 0,
                    100% 0,
                    90% 100%,
                    0 100%
                )`,
        overflow: 'hidden',
        '&:before' : {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: '10',
            // borderRadius: '15px',
            backgroundImage: `url(/file/blocks/${block.images[0].url})`,
            borderTopRightRadius: `1000px 10000px`,
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
    });

    const ImageStyleAr = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        // width: '325px',
        height: '521px',
        // borderRadius: '15px',
        // minHeight: '190px',
        clipPath: `polygon(
                    0 0,
                    100% 0,
                    100% 100%,
                    10% 100%
                )`,
        overflow: 'hidden',
        '&:before' : {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: '10',
            // borderRadius: '15px',
            backgroundImage: `url(/file/blocks/${block.images[0].url})`,
            borderTopLeftRadius: `1000px 10000px`,
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
        <Box className="lg:p-[16px] md:p-0">
            <Box className="relative">
                {
                    lang === 'ar' ?  <ImageStyleAr /> : <ImageStyle />
                }

                <Box className="absolute top-0 right-0 bottom-0 left-0">
                    <Box className={ lang === 'ar' ? styles.shadowar : styles.shadow }>
                        <Box className={`${styles.content}`}>
                            {/*<SectionTitle title={block.title} ></SectionTitle>*/}
                            <Box className="p-[16px]">
                                <Typography
                                    variant="h3"
                                    align={lang === 'ar' ? 'right': 'left'}
                                    sx={{fontWeight: 'bold', color: '#fff', fontSize:{xs: '1.5rem', md: '3rem'} }}
                                    className={styles.titleBorder}
                                >{block.title}</Typography>
                            </Box>

                            <Box className="w-[90%] p-[16px]">
                                <Typography
                                    className={`${styles.clamp}`}
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
    );
};

export default Staff;
