export class BlockCategory {
    id: number;
    name: string;
    description: string;
    blockType: string;
    isActive: boolean;
    createdAt: string;

    constructor({
                    id = -1,
                    name = '',
                    description = '',
                    blockType = '',
                    isActive = false,
                    createdAt = '',
                }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.blockType = blockType;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }

    static columns = [
        'id',
        'name',
        // 'description',
        'blockType',
        'isActive',
        'details',
    ];
}
