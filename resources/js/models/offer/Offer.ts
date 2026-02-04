class Offer {
    id: number;
    referenceId: number;
    type: string;
    name: string;
    isActive: boolean;
    isPercent: boolean;
    amount: number;
    startDate: Date | string;
    endDate: Date |string;
    valid: boolean;

    constructor({
                    id = -1,
                    referenceId = -1,
                    type = '',
                    name = '',
                    isActive = true,
                    isPercent = true,
                    amount = 0,
                    startDate = new Date().toDateString(),
                    endDate = new Date().toDateString(),
                    valid = false,
                }) {
        this.id = id;
        this.referenceId = referenceId;
        this.type = type;
        this.name = name;
        this.isActive = isActive;
        this.isPercent = isPercent;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.valid = valid;
    }
}

export default Offer;
