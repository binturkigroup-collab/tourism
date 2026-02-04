import {Service} from "typedi";

@Service()
class CommonService {
    currencyFormat = (num: number, currency = 'AED ') => {
        return currency.toUpperCase() + ' ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    currencyFormatWithoutUnit = (num: number) => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    static ListLimit = 25;
    static PageSizes = ['25', '50', '100', '200', 'All'];
    static FetchList = ['25', '50', '100', '200'];

    static BaseDate = new Date(2024, 0, 1);

    randomString = (length: number, chars: string) => {
        let mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        let result = '';
        for (let i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
    }

   toSnakeCase = (str = "") => {
        const strArr = str.split(" ");
        // let snakeArr: string [] = [];
        // strArr.map((s, index) => {
        //     if (index === strArr.length-1) {
        //         snakeArr = snakeArr.concat(s);
        //     }
        //     else {
        //         snakeArr = snakeArr.concat(s + '-');
        //     }
        // })
        const snakeArr = strArr.reduce((acc , val) => {
            return acc.concat(val.toLowerCase());
        }, [] as string []);
        return snakeArr.join("-");
       // return snakeArr;
    };

    toTitleCase = (str: string) => {
        return str.replace(/-/g, ' ').replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });
    }

    validateURL = (value: string) => {
        try {
            const newURL = new URL(value);
            return newURL.protocol === 'http:' || newURL.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    getAverage = (arr: number []) => {
        if (arr.length === 0) return 0;
        return (arr.reduce((acc, num) => (acc + num), 0) / arr.length).toFixed(2) || 0;
    }

    getRandomNumber(length: number) {
        return Math.floor(Math.random() * length);
    }
}

export default CommonService;
