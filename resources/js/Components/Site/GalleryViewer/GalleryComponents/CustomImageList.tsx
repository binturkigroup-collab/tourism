import React from 'react';
import {BoxProps, Card, CardContent, CardMedia, ImageList, ImageListItem, Typography} from "@mui/material";
import {useGalleryContext} from "@/Components/Site/GalleryViewer/Context/GalleryContext";
import {Box} from "@mui/material";
import {Container} from "typedi";
import AlbumService from "@/Services/AlbumService/AlbumService";
import "reflect-metadata";
import File from "@/models/files/File";
import {styled} from "@mui/material/styles";
import styles from "./styles.module.scss";

type AlbumProps = {
    src: string;
    title?: string;
}

const CustomImageList: React.FC = () => {
    const albumService = Container.get(AlbumService);
    const {openViewer, album, uri, title} = useGalleryContext();
    const image = album.find(img => img.isCover) || new File({});

    const ImageStyle = styled(Box)<BoxProps>({
        cursor: 'pointer',
        position: 'relative',
        width: '325px',
        height: '421px',
        borderRadius: '53px',
        minHeight: '190px',
        '&:before' : {
            position: 'absolute',
            content: '""',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '53px',
            backgroundImage: `url(/file/blocks/${album[0].url})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(0.9)',
            transition: 'filter 0.3s ease-in-out',
        }
    })

    return (
        <Box>
            {/*=========================1=======================*/}

            {/*<button onClick={openViewer}>Open Viewer</button>*/}
            {/*<ImageList*/}
            {/*    sx={{*/}
            {/*        width: 500,*/}
            {/*        height: 450,*/}
            {/*        cursor: 'pointer',*/}
            {/*    }}*/}
            {/*    cols={3}*/}
            {/*    rowHeight={164}*/}
            {/*    onClick={openViewer}*/}
            {/*>*/}
            {/*    {*/}
            {/*        albumService.getAlbumUrls(album, uri).map((item, key) => (*/}
            {/*            <ImageListItem key={item.src + '-img-lst-' + key}>*/}
            {/*                <img*/}
            {/*                    style={{height: '100%'}}*/}
            {/*                    srcSet={`${item.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}*/}
            {/*                    src={`${item.src}?w=164&h=164&fit=crop&auto=format`}*/}
            {/*                    alt={item.title}*/}
            {/*                    loading="lazy"*/}
            {/*                />*/}
            {/*            </ImageListItem>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</ImageList>*/}

            {/*=========================2=======================*/}

            {/*<Box className="flex justify-center">*/}
            {/*    <Card sx={{ width: 328 }}>*/}
            {/*        <CardMedia*/}
            {/*            sx={{ height: 140 }}*/}
            {/*            image={`/file/blocks/${image.url}`}*/}
            {/*            title={title}*/}
            {/*        />*/}
            {/*        <CardContent>*/}
            {/*            <Typography gutterBottom variant="h5" component="div" noWrap={true}>*/}
            {/*                {title}*/}
            {/*            </Typography>*/}
            {/*            /!*<Typography variant="body2" color="text.secondary" noWrap={true}>*!/*/}
            {/*            /!*    {block.description}*!/*/}
            {/*            /!*</Typography>*!/*/}
            {/*        </CardContent>*/}
            {/*    </Card>*/}
            {/*</Box>*/}

            {/*=========================3=======================*/}

            <Box className="relative m-0 p-0 w-[325px]">
                <ImageStyle />
                <Box className={`absolute bottom-0 left-0 right-0 flex items-center ${styles.titleAria}`}>
                    <Typography variant="h4" align="center" sx={{fontWeight: 'bold', flexBasis: '100%'}}>{title}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomImageList;
