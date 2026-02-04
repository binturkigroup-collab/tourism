import {Service} from "typedi";
import {usePage} from "@inertiajs/react";
import Language from "@/models/language/Language";
import axios from "axios";

@Service()
class LanguageService {
    private languages: Language [] = [];
    private languageCodes: string[] = [];

    constructor() {
        this.languages = usePage().props.settings.languages;
        this.getCodesArray();
    }

    getCodesArray = () => {

        this.languages.map(language => this.languageCodes = [...this.languageCodes, language.code]);
    }

    public get codes () {
        return this.languageCodes;
    }

    setLanguage = (formData: FormData) => {
        return axios.post(
            '/setting/language/set?_method=patch',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

    }
}

export default LanguageService;
