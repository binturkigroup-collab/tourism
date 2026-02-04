import React from 'react';
import Appointment from "@/models/block/Appointment";

const DateElement = (props: Appointment) => {
    const date = new Date(props.startDate);
    return (
        <div className="m-[12px]">
            {date.toLocaleDateString()}
        </div>
    );
};

export default DateElement;
