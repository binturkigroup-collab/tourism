import Discount from "@/models/order/Discount";

class OrderData {
    id: number;
    transactionNumber: string;
    referenceToken: string;
    totalPrice: number;
    status: string;
    currency: string;
    isPaid: boolean;
    discount: Discount | null;
    paymentDate: string;
    createdAt: string;

}

export default OrderData;
