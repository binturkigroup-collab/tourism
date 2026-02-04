import React from "react";
import AppointmentProps from "@/Components/Lists/Interfaces/AppointmentProps";

const initialState: AppointmentProps = {
    appointments: [],
    limit: '0',
    offset: 0,
    search: '',
    count: 0,
    next: () => {},
    loading: false,
    changeLimit: (val: string) => {},
    onSearch: (val: string) => {},
    // activate: (id, status) => {},
    deleteFn: (id) => {},

    // reorder: ([]) => {},
}

const AppointmentContext = React.createContext(initialState);

const AppointmentsProvider: React.FC<React.PropsWithChildren<{ value: AppointmentProps }>> = ({value, children}) => {
    return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>
}

const useAppointmentsContext = () => {
    const context = React.useContext(AppointmentContext);
    if (context === undefined) {
        throw new Error('The context should be inside the provider!');
    }

    return context;
}

export {useAppointmentsContext, AppointmentsProvider};
