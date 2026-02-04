class ItemOffer {
    id: number;
    name: string;
    type: string;
    isPercent: boolean;
    amount: number;
    constructor({
                    id = -1,
                    name = '',
                    type = '',
                    isPercent = false,
                    amount = 0,
                }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.isPercent = isPercent;
        this.amount = amount;
    }
}

export default ItemOffer;
