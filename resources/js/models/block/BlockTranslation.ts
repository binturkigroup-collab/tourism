export class BlockTranslation {
    id: number;
    blockId: number;
    name: string;
    brief: string;
    description: string;
    slug: string;
    language: string;
    isActive: boolean;
    createdAt: string;
    constructor({
                    id = -1,
                    blockId = -1,
                    name = '',
                    brief = '',
                    description = '',
                    slug = '',
                    language = '',
                    isActive = false,
                    createdAt = '',
                }) {
        this.id = id;
        this.blockId = blockId;
        this.name = name;
        this.description = description;
        this.brief = brief;
        this.slug = slug;
        this.language = language;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
}
