import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";

type EmailResponseMessage = {
    status: string;
    message: string;
    details?: string;
}

@Service()
class EmailService {
    sendEmail = (formData: FormData): Promise<AxiosResponse<EmailResponseMessage>> => {
        return axios.post(
            '/send-email',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        );
    }
}

export default EmailService;
