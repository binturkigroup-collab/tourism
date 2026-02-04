import HeaderLayout from '@/Layouts/Site/HeaderLayout';
import React from 'react';
import { Head } from '@inertiajs/react';
import TripProps from "@/Interfaces/Site/TripProps";
import TripCalendar from "@/Pages/Site/components/TripCalendar";

const Calendar: React.FC<{trips: TripProps [], packages: TripProps []}> = ({trips, packages}) => {
    return (
        <HeaderLayout>
            <Head title={'About Us'}>
            </Head>

            <TripCalendar trips={trips} packages={packages}></TripCalendar>
        </HeaderLayout>
    )
};

export default Calendar;

