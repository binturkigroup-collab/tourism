import {Service} from "typedi";
import File from "@/models/files/File";

@Service()
class AlbumService {
    getAlbumUrls = (files: File [], uri: string): GalleryProps [] => {
        return files.map(file => {
            return {
                src: uri + file.url,
                title: file.name,
            }
        });
    }
}

export default AlbumService;
