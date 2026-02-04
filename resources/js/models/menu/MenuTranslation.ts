export class MenuTranslation {
    id: number;
    menuId: number;
    name: string;
    language: string;
    isActive: boolean;
    createdAt: string;
    constructor({
                    id = -1,
                    menuId = -1,
                    name = '',
                    language = '',
                    isActive = false,
                    createdAt = '',
                }) {
        this.id = id;
        this.menuId = menuId;
        this.name = name;
        this.language = language;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
}
