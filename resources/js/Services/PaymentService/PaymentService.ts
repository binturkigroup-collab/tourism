import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";

@Service()
class PaymentService {
    getIntent = (formData: FormData) => {
        return axios.post<{clientSecret: string}>(
            '/payment/intent',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
        })}
}

export default PaymentService;
