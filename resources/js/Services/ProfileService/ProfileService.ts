import {Service} from "typedi";
import {Container} from "typedi";
import "reflect-metadata";
import UploadService from "@/Services/UploadService/UploadService";
import axios from "axios";
import UserInfo from "@/Interfaces/Site/Profile/UserInfo";
import IResetPassword from "@/Interfaces/Site/Profile/IResetPassword";

@Service()
class ProfileService {
     uploadService = Container.get(UploadService);

     uploadCover = (formData: FormData) => {
         return this.uploadService.uploadImage(formData, '/profile/cover');
     }

     uploadProfile = (formData: FormData) => {
         return this.uploadService.uploadImage(formData, 'profile/avatar');
         // return axios.post(
         //     '/profile/avatar?_method=PATCH',
         //     formData,
         //     {
         //         headers: {
         //             'Content-Type' : 'multipart/form-data',
         //         }
         //     }
         // )
     }

     updateUserInfo = (formData: UserInfo) => {
         return axios.patch(
             'profile',
             {...formData},
             {
                 headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                 }
             }
         )
     }

     updatePassword = (formData: IResetPassword) => {
         return axios.put(
             'password',
             {...formData},
             {
                 headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
                 }
             }
         )
     }
}

export default ProfileService;
