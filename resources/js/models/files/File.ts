class File {
    id: number;
    name: string;
    description: string;
    url: string;
    order: number;
    isActive: boolean;
    isCover: boolean;
    isImage: boolean;
    constructor({
                    id = -1,
                    name = '',
                    description = '',
                    url = '',
                    order = -1,
                    isActive = false,
                    isCover = false,
                    isImage = false,
                }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.url = url;
        this.order = order;
        this.isActive = isActive;
        this.isCover = isCover;
        this.isImage = isImage;
    }
}

export default File;
