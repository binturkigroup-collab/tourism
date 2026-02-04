import {Service} from "typedi";
import axios from "axios";
import Lead from "@/models/lead/Lead";

@Service()
export default class LeadService {
    store(formData: FormData) {
        return axios.post(
            '/lead',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    update(formData: FormData, id: number) {
        return axios.post<Lead>(
            `/admin/lead/${id}?_method=PATCH`,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    removeAgent(id: number) {
        return axios.post<Lead>(
            `/admin/lead/remove/${id}?_method=PATCH`,
            {},
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    delete(formData: FormData, id: number) {
        return axios.post(
            `/admin/lead/${id}?_method=DELETE`,
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
            `/admin/lead/agent/${id}?_method=PATCH`,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }
}
