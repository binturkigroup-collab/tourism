import {Container, Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import IResponseJson from "@/Interfaces/JsonResponse/IResponseJson";
import Order from "@/models/order/Order";
import FormService from "@/Services/FormService/FormService";
import OrderStatusEnum, {OrderStatus} from "@/Enums/OrderStatusEnum";
import {OrderGridProps} from "@/Components/Lists/Interfaces/OrderProps";
import OrderDetail from "@/models/order/OrderDetail";

@Service()
class OrderService {
    formService = Container.get(FormService);

    mapOrderGrid = (orders: Order []): OrderGridProps [] => {
        return orders.map(order => {
            return {
                id: order.order.id,
                name: order.user.name,
                avatar: order.user.avatar,
                type: order.user.type,
                transactionNumber: order.order.transactionNumber,
                referenceToken: order.order.referenceToken,
                totalPrice: order.order.totalPrice,
                status: order.order.status,
                currency: order.order.currency,
                isPaid: order.order.isPaid,
                paymentDate: order.order.paymentDate,
                createdAt: order.order.createdAt,
            }
        });
    }

    getProfileList = () => {
        return axios.get<Order []>(
            'order/list',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getOrderList = (...args: {key: string, value: any} []) => {
        const query = this.formService.formQuery(...args);
        return axios.get<Order []>(
            `/admin/order/list` + query,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    storeOrder = (formData: FormData) => {
        return axios.post<AxiosResponse<IResponseJson>>(
            '/order',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    setPaid = (id: number, paymentStatus: boolean) => {
        return axios.patch<Order>(
            `/admin/order/payment/${id}`,
            {paymentStatus},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    changeStatus = (id: number, orderStatus: OrderStatus) => {
        return axios.patch<Order>(
            `/admin/order/status/${id}`,
            {orderStatus},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }



    getCount = () => {
        return axios.get<number>(
            '/admin/order/count',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getPrice = () => {
        return axios.get<number>(
            '/admin/order/price',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getActualPrice = (item: OrderDetail) => {
        if (item.offer === null) return item.price;
        else {
            if (item.offer.isPercent) return item.price * (1 - item.offer.amount / 100);
            else return item.price - item.offer.amount;
        }
    }

    getTimeline = () => {
        return axios.get<{totalRevenue: number, month: string} []>(
            '/admin/order/timeline',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }
}

export default OrderService;
