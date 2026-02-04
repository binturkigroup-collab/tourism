class Coupon {
    id: number;
    code: string;
    amount: number;
    isPercent: boolean;
    startDate: Date | string;
    endDate: Date | string;
    isActive: boolean;
    valid: boolean;

    constructor({
        id = -1,
        code = '',
        amount = 0,
        isPercent = true,
        startDate = new Date().toDateString(),
        endDate = new Date().toDateString(),
        isActive = true,
        valid = false,
                }) {
        this.id = id;
        this.code = code;
        this.amount = amount;
        this.isPercent = isPercent;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.valid = valid;
    }
}

export default Coupon;
