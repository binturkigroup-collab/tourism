export default class Language {
    id: number;
    name: string;
    code: string;
    flagCode: string;
    direction: string;
    isActive: boolean;

    constructor({
                    id = -1,
                    name = '',
                    code = '',
                    flagCode = '',
                    direction = '',
                    isActive = false,
                }) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.flagCode = flagCode;
        this.direction = direction;
        this.isActive = isActive;
    }
}
