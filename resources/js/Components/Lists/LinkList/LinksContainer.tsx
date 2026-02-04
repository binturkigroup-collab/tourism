import React from 'react';
import {Container as ServiceContainer} from "typedi";
import MenuService from "@/Services/MenuService/MenuService";
import CommonService from "@/Services/CommonService/CommonService";
import {Menu} from "@/models/menu/Menu";
import {MenusProvider} from "./LinksContext";
import MenuList from "./Components/MenuList";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import useSnackbarHook from "@/Hooks/SnackbarHook";

type OrderData = {
    id: number,
    order: number,
}

const LinksContainer: React.FC<{menus: Menu [], count: number}> = ({menus, count}) => {
    const [currentMenus, setCurrentMenus] = React.useState<Menu []>(menus);
    const [localeMenus, setLocaleMenus] = React.useState<Menu []>(menus);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>('');
    const menuService = ServiceContainer.get(MenuService);
    const [limit, setLimit] = React.useState<string>(CommonService.FetchList[0]);

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const changeLimit = (val: string) => {
        setLimit(val);
    }
    const activate = (id: number, status: boolean) => {
        const formData = new FormData();
        formData.append('isActive', status ? 'true' : 'false');
        menuService.menuActivation(formData, id)
            .then(response => {
                setCurrentMenus(currentMenus.map(menu => {
                    if (menu.id === response.data.id) return response.data;
                    else return menu;
                }));
                setLocaleMenus(localeMenus.map(menu => {
                    if (menu.id === response.data.id) return response.data;
                    else return menu;
                }));
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true,
                        message: `Link set as ${response.data.isActive ? 'Active' : 'Inactive'} `,
                        severity: "success"
                    })
                );
        })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true,
                        message: `Error happened while changing link status!`,
                        severity: "error"
                    })
                );
                console.log(error);
            })
        ;
    }

    const deleteFn = (id: number) => {
        menuService.deleteMenu(id)
            .then(() => {
                setCurrentMenus(currentMenus.filter(menu => menu.id !== id));
                setLocaleMenus(localeMenus.filter(menu => menu.id !== id));
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Link has been deleted!', severity: "success" })
                );
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting Link!', severity: "error" })
                );
            })
    }

    const reorder = (data: OrderData []) => {
        const formData = new FormData();
        formData.append('list', JSON.stringify(data));
        menuService.reorder(formData)
            .then(() => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Links has been ordered!', severity: "success" })
                );
            })
            .catch((error) => {
                console.log(error);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while reordering links!', severity: "error" })
                );
            })
    }

    const onSearch = (val: string) => {
        // setSearch(val);
        // if (val.length === 0) {
        //     setTimeout(() => {
        //         setCurrentCustomers(localeCustomers);
        //     })
        // }
        // if (val.length > 2) {
        //     setLoading(true);
        //
        //     customerService.getCustomers(
        //         {
        //             key: 'search',
        //             value: val,
        //         },
        //     )
        //         .then(response => {
        //             setLoading(false);
        //             setCurrentCustomers(response.data);
        //         }).catch(error => {
        //         console.log(error);
        //         setLoading(false);
        //     })
        // }
    }

    const next = () => {
        // setLoading(true);
        // // setLocaleCustomers(currentCustomers);
        // customerService.getCustomers(
        //     {
        //         key: 'limit',
        //         value: limit,
        //     },
        //     {
        //         key: 'offset',
        //         value: localeCustomers.length,
        //     }
        // )
        //     .then(response => {
        //         setLoading(false);
        //         setCurrentCustomers(localeCustomers.concat(response.data));
        //         setLocaleCustomers(localeCustomers.concat(response.data));
        //     }).catch(error => {
        //     console.log(error);
        //     setLoading(false);
        // })
    }



    return (
        <MenusProvider
            value={{
                menus: currentMenus,
                limit,
                offset: 0,
                search: '',
                count, next,
                loading: loading,
                changeLimit,
                onSearch,
                activate,
                deleteFn,
                reorder,
            }}
        >
            <MenuList />
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </MenusProvider>
    );
};

export default LinksContainer;
