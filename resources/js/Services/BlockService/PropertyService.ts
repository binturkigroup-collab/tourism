import BlockService from "@/Services/BlockService/BlockService";
import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import Project from "@/models/block/Project";

@Service()
export default class PropertyService extends BlockService{
    getImageUrl = (url: string) => {
        return `${window.location.origin}/file/properties/${url}`
    }

    uploadImage = (formData: FormData, id: number) : Promise<AxiosResponse<Project>> => {
        return axios.post(
            '/admin/block/upload/file/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    getFile = (url: string) => {
        return axios.get(this.getImageUrl(url), {
            responseType: 'arraybuffer',
        })
    }
}
