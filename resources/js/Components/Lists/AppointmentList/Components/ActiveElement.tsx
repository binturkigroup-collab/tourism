import React from 'react';
import Appointment from "@/models/block/Appointment";

const ActiveElement = (props: Appointment) => {
    return (
        <div className="m-[12px]">
            {props.isActive ? 'Active' : 'Inactive'}
        </div>
    );
};

export default ActiveElement;
