import {Service, Container} from "typedi";
import "reflect-metadata";
import Product from "@/models/product/Product";
import ProductTableProps from "@/Interfaces/DataTable/ProductTableProps";
import CategoryService from "@/Services/CategoryService/CategoryService";
import FormService from "@/Services/FormService/FormService";
import Image from "@/models/files/File";
import axios, {AxiosPromise, AxiosResponse} from "axios";
import ProductTranslation from "@/models/product/ProductTranslation";
import IGeneralResponse from "@/Interfaces/IGeneralResponse";
import LocaleProduct from "@/models/product/LocaleProduct";
import IResponseJson from "@/Interfaces/JsonResponse/IResponseJson";
import Review from "@/models/product/Review";
import IUserProductActivities from "@/Interfaces/IUserProductActivities/IUserProductActivities";
import {ProductGridProps} from "@/Components/Lists/Interfaces/ProductProps";
import UserShort, {UserActivity, UserRating, UserReview} from "@/models/User/UserShort";
import formService from "@/Services/FormService/FormService";

type Translations = {
    [code: string] : {
        name: string,
        description: string,
    }[]
}

@Service()
class ProductService {
    language = 'en';
    categoryService = Container.get(CategoryService);
    formService = Container.get(FormService);
    getProductName = (product: Product) => {
        return product.translations.find(trans => trans.language === this.language)?.name || '';
    }

    mapProductGrid = (products: Product []): ProductGridProps [] => {
        return products.map(product => (
            {
                id: product.id,
                name: this.getProductName(product),
                avatar: this.getProductImage(product),
                category: this.categoryService.getCategoryName(product.category),
                isActive: product.isActive,
                sellPrice: product.sellPrice,
                originalPrice: product.originalPrice,
                count: product.count,
                sku: product.sku,
                createdAt: product.createdAt,
                totalSales: product.totalSales,
            }
        ))
    }

    getProductRows = (products: Product[]): ProductTableProps[] => {
        let rows: ProductTableProps [] = [];
        products.map(product => {
            rows = [...rows, {
                id: product.id,
                name: this.getProductName(product),
                // parent: this.getParentCategory(category.parentId, categories),
                category: this.categoryService.getCategoryName(product.category),
                isActive: product.isActive,
                sellPrice: product.sellPrice,
                originalPrice: product.originalPrice,
                sku: product.sku,
                count: product.count,
                edit: 'Edit',
                delete: 'Delete',
                createdAt: product.createdAt,
                image: this.getProductImage(product),
            }];
        })
        return rows;
    }

    getProducts = (...args: {key: string, value: any} []) => {
        const query = this.formService.formQuery(...args);
        return axios.get<Product []>(
            '/admin/product/list' + query,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getLikes = (id: number) => {
        return axios.get<UserActivity []>(
            '/admin/product/likes/' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getFavorites = (id: number) => {
        return axios.get<UserActivity []>(
            '/admin/product/favorites/' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getRatings = (id: number) => {
        return axios.get<UserRating []>(
            '/admin/product/ratings/' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    getReviews = (id: number) => {
        return axios.get<UserReview []>(
            '/admin/product/reviews/' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }



    getProductImage = (product: Product) => {
        const img =
            product.images.find(img => img.isCover) ||
            product.images[0] ||
            new Image({});
        return `${window.location.origin}/file/products/${img.url}`
    }

    getImageUrl = (url: string) => {
        return `${window.location.origin}/file/products/${url}`
    }

    storeProduct = (formData: FormData) => {
        return axios.post<AxiosResponse<Product>>(
            '/admin/product',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
    }

    updateProduct = (formData: FormData, id: number) : Promise<AxiosResponse<Product>> => {
        return axios.post(
            '/admin/product/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    extendedCategory = (formData: FormData, id: number): Promise<AxiosResponse<Product>> => {
        return axios.post(
            '/admin/product/extended/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    deleteExtendedCategory = (formData: FormData, id: number): Promise<AxiosResponse<Product>> => {
        return axios.post(
            '/admin/product/extended/' + id + '?_method=DELETE',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    activateProduct = (formData: FormData, id: number) : Promise<AxiosResponse<Product>> => {
        return axios.post<Product>(
            '/admin/product/activate/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    addImage = (formData: FormData, id: number): Promise<AxiosResponse<Product>> => {
        return axios.post(
            '/admin/product/image/' + id,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    uploadImage = (formData: FormData, id: number) : Promise<AxiosResponse<Product>> => {
        return axios.post(
            '/admin/product/image/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    deleteImage = (formData: FormData, id: number) : Promise<AxiosResponse<Product>> => {
        return axios.post(
            '/admin/product/image/' + id + '?_method=DELETE',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    deleteProduct = (id: number): Promise<AxiosResponse<IGeneralResponse>> => {
        return axios.post(
            '/admin/product/' + id + '?_method=DELETE',
            {},
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
    }

    getTranslationsDetails = (translations: ProductTranslation []) => {
        const transDetails: Translations = {};
        translations.map(trans => {
            Object.assign(transDetails, {
                [trans.language]: {
                    name: trans.name,
                    description: trans.description,
                }
            })
        });
        return transDetails;
    }

    uniqueSKU = (sku: string, id = -1) => {
        return axios.post<AxiosResponse<boolean>>(
            '/admin/product/sku/' + id,
            {sku},
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
    }

    getCount = () => {
        return axios.get<number>(
            '/admin/product/count',
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
    }

    getLocaleProducts = (lang: string, ...args: {key: string, value: any} []): AxiosPromise<LocaleProduct []> => {
        const query = this.formService.formQuery(...args);
        return axios.get(
            `/${lang}/product/list` + query,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    getLocaleProduct = (lang: string, id: number): AxiosPromise<LocaleProduct> => {
        return axios.get(
            `/${lang}/product/get/${id}`,
            {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                }
            }
        )
    }

    searchProductByName = (name: string) => {
        return axios.get<LocaleProduct []>(
            '/product/search/' + name,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    like = (formData: FormData) => {
        return axios.post<AxiosResponse<IResponseJson>>(
            '/product/like',
            formData,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    favorite = (formData: FormData) => {
        return axios.post<AxiosResponse<IResponseJson>>(
            '/product/favorite',
            formData,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    review = (formData: FormData) => {
        return axios.post<Review>(
            '/product/review',
            formData,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    rate = (formData: FormData) => {
        return axios.post<AxiosResponse<IResponseJson>>(
            '/product/rate',
            formData,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    getProductsActivities = () => {
        return axios.get<IUserProductActivities>(
            '/product/activities',
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        )
    }

    getPrice = (product: LocaleProduct) => {
        if(product.offer === null) return product.sellPrice;
        else {
            if (product.offer.isPercent) return product.sellPrice * (1 - product.offer.amount / 100);
            else return  product.sellPrice - product.offer.amount;
        }
    }

    allLikes = () => {
        return axios.get<number>(
            '/admin/product/all/likes',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    allFavorites = () => {
        return axios.get<number>(
            '/admin/product/all/favorites',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    allRatings = () => {
        return axios.get<number>(
            '/admin/product/all/ratings',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    allReviews = () => {
        return axios.get<number>(
            '/admin/product/all/reviews',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    topProducts = () => {
        return axios.get<Product []>(
            '/admin/product/top/sales',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    localeTopProducts = (lang: string = 'en', ...args: {key: string, value: any} []): AxiosPromise<LocaleProduct []> => {
        const query = this.formService.formQuery(...args);
        return axios.get(
            `/${lang}/product/top/sales` + query,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }

    localeOffers = (lang: string = 'en', ...args: {key: string, value: any} []): AxiosPromise<LocaleProduct []> => {
        const query = this.formService.formQuery(...args);
        return axios.get(
            `/${lang}/product/offers` + query,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
    }



}

export default ProductService;
