import React from 'react';
import Appointment from "@/models/block/Appointment";
import {Box, Stack} from "@mui/material";
import {Link} from "@inertiajs/react";
import CustomButton from "@/Components/Button/CustomButton";
import AppointmentsContainer from "@/Components/Lists/AppointmentList/AppointmentsContainer";

const Appointments: React.FC<{appointments: Appointment [], count: number}> = ({appointments, count}) => {

    return (
        <Box className="py-[16px]">
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Link href={`/admin/appointments/create`}>
                    <CustomButton task='add' text={'Appointment'}></CustomButton>
                </Link>

                <AppointmentsContainer appointments={appointments} count={count}></AppointmentsContainer>

                {/*<Link href={`/admin/website/block/reorder/${category}`}>*/}
                {/*    <CustomButton task='reorder' text={getTitle()}></CustomButton>*/}
                {/*</Link>*/}
            </Stack>
        </Box>
    );
};

export default Appointments;
