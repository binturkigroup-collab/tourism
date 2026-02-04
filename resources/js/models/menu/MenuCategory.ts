export class MenuCategory {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;

    constructor({
                    id = -1,
                    name = '',
                    isActive = false,
                    createdAt = '',
                }) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }

    public static columns = [
        'id',
        'name',
        'isActive',
        'createdAt',
        'details',
    ];
}
