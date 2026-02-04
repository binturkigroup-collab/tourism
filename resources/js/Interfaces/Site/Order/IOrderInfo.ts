import IWizardControls from "@/Interfaces/Site/WizardControls/IWizardControls";

export interface IItemInfo {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface IBillingInfo {
    name: string;
    email: string;
    mobile: string;
    addressDetails: string;
    buildingName: string;
    floorNumber: string;
    completed: boolean;
    // country?: string;
    // city?: string;
    // state?: string;
}

export interface IPaymentInfo {
    isPaid: boolean;
    currency: string;
    transactionNumber?: string;
    referenceToken?: string;
    completed: boolean;
}

export default interface IOrderInfo extends IWizardControls {
    // items: IItemInfo [];
    billing: IBillingInfo;
    payment: IPaymentInfo;

    onBillingInfoChange: (data: IBillingInfo) => void;

    onPaymentInfoChange: (data: IPaymentInfo) => void;

    sendOrder: () => void;
}
