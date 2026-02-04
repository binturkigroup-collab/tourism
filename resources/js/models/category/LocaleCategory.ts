import File from "@/models/files/File";

class LocaleCategory {
    id: number;
    order: number;
    name: string;
    images: File [];
    children: LocaleCategory [];
    constructor( {
                    id = -1,
                    order = 0,
                    name = '',
                    images = [] as File[],
                    children = [] as LocaleCategory [],

                 }) {
        this.id = id;
        this.name = name;
        this.order = order;
        this.images = images;
        this.children = [...children];
    }
}

export default LocaleCategory;
