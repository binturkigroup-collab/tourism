import React from 'react';
import {Link, usePage} from "@inertiajs/react";
import {useTranslation} from "react-i18next";
import {styled} from "@mui/material/styles";
import {Box, BoxProps, Button, Typography} from "@mui/material";
import styles from "./styles.module.scss";
import BlockProps from "@/Interfaces/Site/BlockProps";

const NewsCard: React.FC<{block: BlockProps, index?: number}> = ({block, index = 0}) => {
    const lang = usePage().props.lang;
    const { t } = useTranslation();
    // const ImageStyle = styled(Box)<BoxProps>({
    //     cursor: 'pointer',
    //     position: 'relative',
    //     width: '325px',
    //     height: '421px',
    //     borderRadius: '53px',
    //     minHeight: '190px',
    //     overflow: 'hidden',
    //     '&:before' : {
    //         position: 'absolute',
    //         content: '""',
    //         top: 0,
    //         left: 0,
    //         width: '100%',
    //         height: '100%',
    //         borderRadius: '53px',
    //         backgroundImage: `url(/file/blocks/${block.images[0].url})`,
    //         backgroundPosition: 'center center',
    //         backgroundSize: 'cover',
    //         backgroundRepeat: 'no-repeat',
    //         filter: 'grayscale(0.9)',
    //         transform: 'scale(1)',
    //         transition: 'all 0.3s ease-in-out',
    //     },
    //     '&:hover' : {
    //         '&:before': {
    //             transform: 'scale(1.05)',
    //         }
    //     }
    // })

    const ImageStyle = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        width: '325px',
        height: '243px',
        borderRadius: '0px',
        minHeight: '190px',
        overflow: 'hidden',
        '&:before' : {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '0px',
            backgroundImage: `url(/file/blocks/${block.images[0].url})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // filter: 'grayscale(0.9)',
            // transform: 'scale(1)',
            transition: 'all 0.3s ease-in-out',
        },
        '&:hover' : {
            '&:before': {
                transform: 'scale(1.05)',
            }
        }
    })

    return (
        // <Grid
        //     container
        //     spacing={2}
        //     direction={{xs: 'column', md: 'row'}}
        //     justifyContent={{xs: 'flex-start', md: 'flex-start'}}
        //     alignItems={{xs: 'stretch', md: 'stretch'}}
        //
        // >
        //     <Grid
        //         item
        //         md={5}
        //     >
        //         <Box
        //             className="px-[16px]"
        //         >
        //             <ImageStyle />
        //         </Box>
        //     </Grid>
        //     <Grid
        //         item
        //         md={7}
        //     >
        //         <Box
        //             className="p-[16px]"
        //         >
        //             <Box className={`absolute botttom-0 left-0 right-0`}>
        //                 <Typography variant="h5">{block.title}</Typography>
        //             </Box>
        //
        //             {/*<Box className="styled-list" dangerouslySetInnerHTML={{__html: block.description}}></Box>*/}
        //
        //             {/*<Typography variant="body2" ></Typography>*/}
        //         </Box>
        //     </Grid>
        // </Grid>
        <Box className="relative m-0 p-0">
            <Box className={`${styles.bgRed}`}>
                <Box className="flex items-center gap-3">
                    <Typography
                        variant="h6"
                        align={lang === 'ar' ? 'right' : 'left'}
                        sx={{ fontWeight: 'bold' }}
                        noWrap
                    >{block.title}</Typography>
                    <Typography variant="body2" component="p">{block.startDate}</Typography>
                </Box>


                <Typography className={`${styles.clamp}`} dangerouslySetInnerHTML={{__html: block.description}}></Typography>
            </Box>
            {/*<Box>*/}
            {/*    <Typography className={`${styles.clamp}`} dangerouslySetInnerHTML={{__html: block.description}}></Typography>*/}
            {/*</Box>*/}
        </Box>
    );
};

export default NewsCard;
