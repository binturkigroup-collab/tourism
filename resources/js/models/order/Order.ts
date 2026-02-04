import OrderData from "@/models/order/OrderData";
import OrderDetail from "@/models/order/OrderDetail";
import OrderAddress from "@/models/order/OrderAddress";
import UserShort from "@/models/User/UserShort";

class Order {
    order: OrderData;
    items: OrderDetail [];
    address: OrderAddress;
    user: UserShort;
}

export default Order;
