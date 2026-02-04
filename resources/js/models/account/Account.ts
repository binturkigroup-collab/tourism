class Account {
    id: number;
    userId: number;
    name: string;
    url: string;
    isActive: boolean;

    constructor({
                    id = -1,
                    userId = -1,
                    name = '',
                    url = '',
                    isActive = false,
                }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.url = url;
        this.isActive = isActive;
    }
}

export default Account;
