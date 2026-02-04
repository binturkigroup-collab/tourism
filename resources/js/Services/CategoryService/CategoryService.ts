import axios, {AxiosResponse} from "axios";
import Category from "@/models/category/Category";
import {Service} from "typedi";
import CategoryTableProps from "@/Interfaces/DataTable/CategoryTableProps";
import SelectItemsProps from "@/Interfaces/SelectItemsProps"
import CategoryTranslation from "@/models/category/CategoryTranslation";
import IGeneralResponse from "@/Interfaces/IGeneralResponse";
import LocaleCategory from "@/models/category/LocaleCategory";
import {CategoryGridProps} from "@/Components/Lists/Interfaces/CategoryProps";

type Translations = {
    [code: string] : {
        name: string,
        description: string,
    }[]
}

@Service()
class CategoryService {
    language = 'en';

    mapCategoryGrid = (categories: Category []): CategoryGridProps []=> {
        return categories.map(category => {
            return {
                id: category.id,
                name: this.getCategoryName(category),
                avatar: category.images[0].url,
                isActive: category.isActive,
                parent: this.getParentCategory(category.parentId, categories),
                createdAt: category.createdAt,
            }
        })

    }

    storeCategory = (formData: FormData) : Promise<AxiosResponse<Category>> => {
        return axios.post(
            '/admin/category',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    updateCategory = (formData: FormData, id: number) : Promise<AxiosResponse<Category>> => {
        return axios.post(
            '/admin/category/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    uploadImage = (formData: FormData, id: number) : Promise<AxiosResponse<Category>> => {
        return axios.post(
            '/admin/category/image/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    activateCategory = (formData: FormData, id: number) : Promise<AxiosResponse<Category>> => {
        return axios.post(
            '/admin/category/activate/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    extendCategory = (formData: FormData, id: number) : Promise<AxiosResponse<Category>> => {
        return axios.post(
            '/admin/category/extend/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    deleteCategory = (id: number): Promise<AxiosResponse<IGeneralResponse>> => {
        return axios.post(
            '/admin/category/' + id + '?_method=DELETE',
            {},
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        )
    }

    // getParent = (categories: Category[], parentId: number) => {}

    getParentCategory = (parentId: number | null, categories: Category[]) => {
        let parentName = '';
        if (parentId !== null) {
            const parentCategory = categories.find(cat => cat.id === parentId) || null;
            if (parentCategory !== null) {
                parentName = parentCategory.translations.find(trans => trans.language === this.language)?.name || '';
            }
        }
        return parentName;
    }

    getCategoryName = (category: Category) => {
        return category.translations.find(trans => trans.language === this.language)?.name || '';
    }

    getCategoryRows = (categories: Category[]): CategoryTableProps[] => {
        let rows: CategoryTableProps [] = [];
        categories.map(category => {
            rows = [...rows, {
                id: category.id,
                name: this.getCategoryName(category),
                parent: this.getParentCategory(category.parentId, categories),
                isActive: category.isActive,
                edit: 'Edit',
                delete: 'Delete',
                createdAt: category.createdAt,
                image: this.getCategoryImage(category),
            }];
        })
        return rows;
    }

    getAllTranslations = (categories: Category[]) : SelectItemsProps [] => {
        let translations : SelectItemsProps[] = [];
        categories.map(category => category.translations).map(trans => {
            trans.map(tr => {
                if (tr.language === this.language) {
                    translations = [...translations, {
                        id: tr.categoryId,
                        name: tr.name,
                    }];
                }
            })
        });
        return translations;
    }

    getCategoryImage = (category: Category) => {
        return `${window.location.origin}/file/categories/${category.images[0].url}`
    }

    getTranslationsDetails = (translations: CategoryTranslation []) => {
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

    reorder = (formData: FormData) => {
        return axios.post(
            '/admin/category/reorder',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    flattenCategory = (categories: LocaleCategory [], flatCategories: LocaleCategory [] = []) => {

        categories.map(cat => {
            if (cat.children.length === 0) flatCategories = [...flatCategories, cat];
            else {
                flatCategories = flatCategories.concat(this.flattenCategory(cat.children));
            }
        })

        return flatCategories;
    }
}

export default CategoryService;
