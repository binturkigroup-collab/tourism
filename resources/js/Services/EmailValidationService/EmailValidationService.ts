import {Service} from "typedi";
import axios from "axios";

@Service()
class EmailValidationService {
    validateEmail = (value: string) => {
        return axios.get<{status: boolean}>('/api/user/email?email=' + value)
    }
}
export default EmailValidationService;
