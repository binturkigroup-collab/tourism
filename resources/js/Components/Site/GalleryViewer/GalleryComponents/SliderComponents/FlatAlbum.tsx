import React from 'react';
import styles from "../styles.module.scss";
import File from "@/models/files/File";
import {Box, Typography} from "@mui/material";
import {Container} from "typedi";
import AlbumService from "@/Services/AlbumService/AlbumService";
import {useGalleryContext} from "@/Components/Site/GalleryViewer/Context/GalleryContext";

const FlatAlbum = () => {

    const albumService = Container.get(AlbumService);
    const {openViewer, album, uri, title} = useGalleryContext();
    const image = album.find(img => img.isCover) || new File({});
    const cover = album.find(img => img.isCover) ||
        new File({});
    return (
        <Box className="p-[16px]">
            <Box className={styles.serviceCard}>
                <Box className={styles.boxContainer}>
                    <Box className={styles.imgFlex}>
                        {
                            albumService.getAlbumUrls(album, uri).map((img, key) => {
                                return (
                                    <Box
                                        className={styles.imgCard}
                                        key={img.src + '-img-lst-' + key}
                                        onClick={openViewer}
                                    >
                                        <img src={`${img.src}`} alt={img.title}/>
                                    </Box>
                                );
                            })
                        }
                    </Box>
                </Box>
                <Box className={`m-[32px] p-[16px] ${styles.coverAria}`}>
                    <img src={`/file/blocks/${cover.url}`} alt=""/>
                    <Box className={styles.titleAria}>
                        <Typography variant="body2" component="p" align="center" sx={{fontWeight: 'bold'}}>{title}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FlatAlbum;
