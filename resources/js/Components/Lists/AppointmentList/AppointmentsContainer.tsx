import React from 'react';
import {Container as ServiceContainer} from "typedi";
import CommonService from "@/Services/CommonService/CommonService";
import useSnackbarHook from "@/Hooks/SnackbarHook";
import CustomSnackbar from "@/Components/Snackbar/CustomSnackbar";
import Appointment from "@/models/block/Appointment";
import AppointmentService from "@/Services/BlockService/AppointmentService";
import {AppointmentsProvider} from "@/Components/Lists/AppointmentList/AppointmentContext";
import AppointmentsList from "@/Components/Lists/AppointmentList/Components/AppointmentsList";
import {number} from "zod";


const AppointmentsContainer: React.FC<{appointments: Appointment [], count: number}> = ({appointments, count}) => {
    const [currentAppointments, setCurrentAppointments] = React.useState<Appointment []>(appointments);
    const [localeAppointments, setLocaleAppointments] = React.useState<Appointment []>(appointments);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState<string>('');
    const appointmentService = ServiceContainer.get(AppointmentService);
    const [limit, setLimit] = React.useState<string>(CommonService.FetchList[0]);

    // =========================================================================================
    // Snackbar configuration section:

    const {snackbar, setSnackbar, handleClose} =
        useSnackbarHook({open: false, message: '', severity: "success"});

    // =========================================================================================

    const changeLimit = (val: string) => {
        setLimit(val);
    }

    const deleteFn = (id: number) => {

        const formData = new FormData();
        formData.append('id', id.toString())
        formData.append('category', 'appointment');
        // if (category) {
        //     formData.append('category', category);
        // }
        appointmentService.destroy(id, formData)
            .then(() => {
                setCurrentAppointments(currentAppointments.filter(block => block.id !== id));
                setLocaleAppointments(localeAppointments.filter(block => block.id !== id));
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Appointment has been deleted!', severity: "success" })
                );
            })
            .catch(error => {
                setSnackbar(snackbarState =>
                    ({ ...snackbarState, open: true, message: 'Error Happened while deleting appointment!', severity: "error" })
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
        <AppointmentsProvider
            value={{
                appointments: currentAppointments,
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
            <AppointmentsList />
            <CustomSnackbar
                open={snackbar.open}
                message={snackbar.message}
                onClose={handleClose}
                severity={snackbar.severity}
            />
        </AppointmentsProvider>
    );
};

export default AppointmentsContainer;
