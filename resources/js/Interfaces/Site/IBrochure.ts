import File from "@/models/files/File";

interface IBrochure {
    brochure: File;
    title: string;
    youtubeUrl: string;
    qrFile: File;
}

export default IBrochure;
