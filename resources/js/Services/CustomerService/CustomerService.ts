import {Service} from "typedi";
import {Normal} from "@/types";
import CustomerTable from "@/Interfaces/DataTable/CustomerTable";
import axios from "axios";
import {Container} from "typedi";
import "reflect-metadata";
import FormService from "@/Services/FormService/FormService";
import IUserProductActivities, {
    ReviewProductActivity
} from "@/Interfaces/IUserProductActivities/IUserProductActivities";
import Order from "@/models/order/Order";
import Review from "@/models/product/Review";
// import {usePage} from "@inertiajs/react";

@Service()
class CustomerService {
    // lang = usePage().props.lang;
    formService = Container.get(FormService);

    activateCustomer(status: boolean, id: number) {
        return axios.patch<Normal>(
            '/admin/user/list/' + id,
            {status}
        );
    }

    getCustomers = (...args: {key: string, value: any} []) => {
        const query = this.formService.formQuery(...args);
        return axios.get<Normal []>(
            '/admin/user/list' + query,
        )
    }

    getCount = () => {
        return axios.get<number>(
            '/admin/user/count',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getActivities = (userId: number, lang: string) => {
        return axios.get<IUserProductActivities>(
            `/${lang}/admin/user/activities/` + userId,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    getOrders = (userId: number, lang: string) => {
        return axios.get<Order []>(
            `/${lang}/admin/user/orders/` + userId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    activateReview = (formData: FormData) => {
        return axios.patch<Review>(
            '/admin/user/review/activate',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }
}

export default CustomerService;
