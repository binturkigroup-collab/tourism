import {Service, Container} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";
import ls from 'localstorage-slim';
import {AES} from "crypto-js";
import * as encUTF8 from "crypto-js/enc-utf8";
import {ICart} from "@/Interfaces/Site/Product/Cart";
ls.config.encrypt = true;
ls.config.secret = import.meta.env.VITE_LS_SECRET;
ls.config.ttl = 14 * 24 * 60 * 60; //14 Days

ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret as string).toString();
ls.config.decrypter = (data, secret) => {
    try {
        return JSON.parse(AES.decrypt((data as string), (secret as string)).toString(encUTF8))
    } catch (e) {
        return data;
    }
}

@Service()
class SecureCartService {

    private static readonly appName =
        Container.get(CommonService).toSnakeCase(import.meta.env.VITE_APP_NAME as string) + '-cart';

    encryptCart = (data: ICart) => {
        ls.set(SecureCartService.appName, data);
    }

    decryptCart = (): ICart => {
        return ls.get(SecureCartService.appName) as ICart;
    }

    removeCart = () => {
        ls.remove(SecureCartService.appName)
    }
}

export default SecureCartService;
