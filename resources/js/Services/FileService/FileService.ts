
import {Service} from "typedi";

@Service()
class FileService {
    DefaultImage = '/file/defaults/default-cover.jpg';

    static LOGO = "/file/logo";
    static MAX_FILE_SIZE = 500; //500KB.
    convertBase64 = (file: any) => {
        return new Promise<string|ArrayBuffer|null>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    assertImage(file: File | null) {
        if (file) {
            const mimeType = file.type;
            return mimeType.match(/image\/*/) !== null;
        }
        return false;
    }

    assertSize(file: File | null) {
        if (file) {
            const size = file.size;
            return size / (1024) <= FileService.MAX_FILE_SIZE;
        }
        return false;
    }

    // assertImage(file: File, control: AbstractControl<any, any> | null) {
    //     if(file){
    //         this.convertBase64(file).then((data) => {
    //             const mimeType = file.type;
    //
    //             if (mimeType.match(/image\/*/) == null) {
    //                 if(control){
    //                     control.setErrors({'isNotImage': true})
    //                 }
    //             }
    //         });
    //     }
    //     return null;
    //
    // }
}

export default FileService;
