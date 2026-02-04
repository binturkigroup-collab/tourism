import React from 'react';
import {Container as ServiceContainer} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import CommonService from "@/Services/CommonService/CommonService";
import {Block} from "@/models/block/Block";
import {BlocksProvider} from "./BlocksContext";
import BlockList from "./Components/BlockList";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import {number} from "zod";

type OrderData = {
    id: number,
    order: number,
}

const BlocksContainer: React.FC<{blocks: Block [], count: number}> = ({blocks, count}) => {
    const [currentBlocks, setCurrentBlocks] = React.useState<Block []>(blocks);
    const [localeBlocks, setLocaleBlocks] = React.useState<Block []>(blocks);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>('');
    const blockService = ServiceContainer.get(BlockService);
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
        blockService.blockActivation(formData, id)
            .then(response => {
                setCurrentBlocks(currentBlocks.map(block => {
                    if (block.id === response.data.id) return response.data;
                    else return block;
                }));
                setLocaleBlocks(localeBlocks.map(block => {
                    if (block.id === response.data.id) return response.data;
                    else return block;
                }));
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true,
                        message: `Block set as ${response.data.isActive ? 'Active' : 'Inactive'} `,
                        severity: "success"
                    })
                );
        })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true,
                        message: `Error happened while changing block status!`,
                        severity: "error"
                    })
                );
                console.log(error);
            })
        ;
    }

    const deleteFn = (id: number, category?: string) => {
        const formData = new FormData();
        if (category) {
            formData.append('category', category);
        }
        blockService.deleteBlock(id, formData)
            .then(() => {
                setCurrentBlocks(currentBlocks.filter(block => block.id !== id));
                setLocaleBlocks(localeBlocks.filter(block => block.id !== id));
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Block has been deleted!', severity: "success" })
                );
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting block!', severity: "error" })
                );
            })
    }

    const reorder = (data: OrderData []) => {
        const formData = new FormData();
        formData.append('list', JSON.stringify(data));
        blockService.reorder(formData)
            .then(() => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Blocks has been ordered!', severity: "success" })
                );
            })
            .catch((error) => {
                console.log(error);
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while reordering blocks!', severity: "error" })
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
        <BlocksProvider
            value={{
                blocks: currentBlocks,
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
            <BlockList />
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </BlocksProvider>
    );
};

export default BlocksContainer;
