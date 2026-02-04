import ListProps from "./ListProps";
import Order from "@/models/order/Order";
import {OrderStatus} from "@/Enums/OrderStatusEnum";
export type QueryPair = {
    key: string,
    value: string,
}
interface OrderProps extends ListProps {
    orders: Order [],
    status: (id: number, status: OrderStatus) => void,
    // query: {key: string, value: string} [],
    handleQuery: (pairs: QueryPair []) => void,
    drawer?: boolean,
    handleDrawer?: (val: boolean) => void,
    // fromDate: string,
    // toDate: string,
    // status: OrderStatusEnum,
}

export interface OrderGridProps {
    id: number;
    name: string;
    avatar: string;
    type: string;
    transactionNumber: string;
    referenceToken: string;
    totalPrice: number;
    status: string;
    currency: string;
    isPaid: boolean;
    paymentDate: string;
    createdAt: string;
}

export default OrderProps;
