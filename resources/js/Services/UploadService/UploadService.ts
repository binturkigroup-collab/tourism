import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import {usePage} from "@inertiajs/react";
import {PageProps, User} from "@/types";
import {data} from "autoprefixer";
@Service()
class UploadService {
    uploadImage = (formData: FormData, url: string) : Promise<AxiosResponse<string>> => {
        return axios.post<string>(
            url + '?_method=PATCH',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        )
    }
}

export default UploadService;
