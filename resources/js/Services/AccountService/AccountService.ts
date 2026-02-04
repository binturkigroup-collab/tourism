import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import Account from "@/models/account/Account";
import SocialEnum from "@/Enums/SocialEnum";


type AccountProps = {
    icon: string;
    url: string;
}
@Service()
class AccountService {
    storeAccount = (formData: FormData) : Promise<AxiosResponse<Account>> => {
        return axios.post<Account> (
            '/profile/account',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        )
    }

    updateAccount = (formData: FormData, id: number) : Promise<AxiosResponse<Account>> => {
        return axios.post<Account> (
            '/profile/account/' + id + '?_method=PATCH',
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        )
    }

    deleteAccount = (id: number) : Promise<AxiosResponse<{status: string, message: string}>> => {
        return axios.post<{status: string, message: string}> (
            '/profile/account/' + id + '?_method=DELETE',
            {},
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        )
    }

    //This function is used to map influencer accounts according to SocialEnum order.
    getAccountsProps(accounts: Account[]) : AccountProps [] {
        let accountsProps: AccountProps [] = [];
        Object.keys(SocialEnum).map(social => {
            accounts.map(acc => {
                if (acc.name === social)
                    accountsProps = [...accountsProps, {icon: acc.name.toLowerCase(), url: acc.url}];
            })
        })
        return accountsProps;
    }
}

export default AccountService;
