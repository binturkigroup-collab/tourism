import React from 'react';
import Contact from "@/models/Contact/Contact";
import ContactService from "@/Services/Contact/ContactService";
import {Container as ServiceContainer} from "typedi";
import CommonService from "@/Services/CommonService/CommonService";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import {ContactsProvider} from "@/Components/Lists/ContactList/ContactsContext";
import ContactsList from "@/Components/Lists/ContactList/Components/ContactsList";

const ContactsContainer: React.FC<{contacts: Contact [], count: number}> = ({contacts, count}) => {
    const [currentContacts, setCurrentContacts] = React.useState<Contact []>(contacts);
    const [localeContacts, setLocaleContacts] = React.useState<Contact []>(contacts);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>('');
    const contactService = ServiceContainer.get(ContactService);
    const [limit, setLimit] = React.useState<string>(CommonService.FetchList[0]);

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const changeLimit = (val: string) => {
        setLimit(val);
    }

    const deleteFn = (id: number, category?: string) => {
        const formData = new FormData();
        formData.append('id', id.toString())
        // if (category) {
        //     formData.append('category', category);
        // }
        contactService.destroy(id, formData)
            .then(() => {
                setCurrentContacts(currentContacts.filter(block => block.id !== id));
                setLocaleContacts(localeContacts.filter(block => block.id !== id));
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
        <ContactsProvider
            value={{
                contacts: currentContacts,
                limit,
                offset: 0,
                search: '',
                count, next,
                loading: loading,
                changeLimit,
                onSearch,
                deleteFn,
            }}
        >
            <ContactsList />
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </ContactsProvider>
    );
};

export default ContactsContainer;
