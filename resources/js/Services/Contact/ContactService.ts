import {Service} from "typedi";
import axios from "axios";
import Contact from "@/models/Contact/Contact";

@Service()
class ContactService {
    // get() {
    //     return axios.get<Contact []>(
    //         `/api/contact`
    //     )
    // }
    //
    // show(id: number) {
    //     return axios.get<Contact>(
    //         `/api/contact/${id}`
    //     )
    // }

    destroy(id: number, formData: FormData) {
        return axios.post<{status: string, message: string}>(
            `/admin/contact/${id}?_method=DELETE`,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    agent(formData: FormData, id: number) {
        return axios.post(
            `/admin/contact/agent/${id}?_method=PATCH`,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }
}

export default ContactService;
