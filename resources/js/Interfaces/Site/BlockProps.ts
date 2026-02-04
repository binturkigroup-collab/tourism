import File from "@/models/files/File";

interface BlockProps {
    id: number;
    title: string;
    description: string;
    brief: string;
    slug: string;
    images: File [];
    file: string | null;
    url: string;
    startDate: string | null;
    endDate: string | null;
    children: BlockProps[];
}

export default BlockProps;
