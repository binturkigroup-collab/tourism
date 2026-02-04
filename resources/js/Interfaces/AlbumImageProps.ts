import {CardMediaProps} from "@mui/material/CardMedia";

interface AlbumImageProps extends CardMediaProps {
    // callback: (image: File | null) => void,
    imageChanged: (file: File | null) => void,
    imageDelete: () => void,
}

export default AlbumImageProps
