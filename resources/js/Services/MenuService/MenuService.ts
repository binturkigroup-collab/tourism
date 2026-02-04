import {Service} from "typedi";
import {MenuTranslation} from "@/models/menu/MenuTranslation";
import SelectItemsProps from "@/Interfaces/SelectItemsProps";
import {Menu} from "@/models/menu/Menu";
import axios, {AxiosResponse} from "axios";
import {Block} from "@/models/block/Block";
import BlockTableProps from "@/Interfaces/DataTable/BlockTableProps";
import CategoryTableProps from "@/Interfaces/DataTable/CategoryTableProps";
import MenuTableProps from "@/Interfaces/DataTable/MenuTableProps";
import {MenuGridProps} from "@/Components/Lists/Interfaces/LinkProps";
import MenuLink from "@/models/Link/MenuLink";

type Translations = {
    [code: string] : {
        name: string,
        description: string,
    }[]
}

@Service()
class MenuService {
    language = 'en';
    mapMenuGrid = (menus: Menu []): MenuGridProps [] => {
        return menus.map(menu => (
            {
                id: menu.id,
                name: this.getMenuName(menu),
                parent: this.getParentMenu(menu.parentId, menus),
                isActive: menu.isActive,
            }
        ))
    }

    getTranslationsDetails = (translations: MenuTranslation []) => {
        const transDetails: Translations = {};
        translations.map(trans => {
            Object.assign(transDetails, {
                [trans.language]: {
                    name: trans.name,
                }
            })
        });
        return transDetails;
    }

    getAllTranslations = (menus: Menu[], parent = false) : SelectItemsProps [] => {
        let translations : SelectItemsProps[] = [];
        menus.filter(menu =>
            (parent && menu.type === 'List') || (!parent)
        ).map(menu => menu.translations).map(trans => {
            trans.map(tr => {
                if (tr.language === this.language) {
                    translations = [...translations, {
                        id: tr.menuId,
                        name: tr.name,
                    }];
                }
            })
        });
        return translations;
    }

    getParentMenu = (parentId: number | null, menus: Menu[]) => {
        let parentName = '';
        if (parentId !== null) {
            const parentMenu = menus.find(menu => menu.id === parentId) || null;
            if (parentMenu !== null) {
                parentName = parentMenu.translations.find(trans => trans.language === this.language)?.name || '';
            }
        }
        return parentName;
    }

    getMenuName = (menu: Menu) => {
        return menu.translations.find(trans => trans.language === this.language)?.name || '';
    }

    getMenuRows = (menus: Menu[]): MenuTableProps[] => {
        let rows: MenuTableProps [] = [];
        menus.map(menu => {
            rows = [...rows, {
                id: menu.id,
                name: this.getMenuName(menu),
                parent: this.getParentMenu(menu.parentId, menus),
                isActive: menu.isActive,
                edit: 'Edit',
                delete: 'Delete',
                createdAt: menu.createdAt,
                // image: this.getBlockImage(block),
            }];
        })
        return rows;
    }

    storeMenu = (formData: FormData) => {
        return axios.post(
            '/admin/menu',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    updateMenu= (formData: FormData, id: number) : Promise<AxiosResponse<Menu>> => {
        return axios.post(
            '/admin/menu/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    menuActivation = (formData: FormData, id: number): Promise<AxiosResponse<Menu>> => {
        return axios.post(
            '/admin/menu/activation/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    updateFile = (formData: FormData, id: number) : Promise<AxiosResponse<Menu>> => {
        return axios.post(
            '/admin/menu/upload/file/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    deleteMenu= (id: number) => {
        return axios.post(
            '/admin/menu/' + id + '?_method=DELETE',
            {},
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    reorder = (formData: FormData) => {
        return axios.post(
            '/admin/menu/reorder',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    getSplitLink = (links: MenuLink [], value: string): string =>  {
        return links
            .filter(link => link.name.toLowerCase().includes(value))[0]
            ?.url.split(':')[1] || '';
    }

    getAddress = () => {
        return 'Office # 313 Makatib Building| Opp. Toyota AlMakhtoom road| Port Saeed, Dubai, UAE'.split('|');
    }
}

export default MenuService;
