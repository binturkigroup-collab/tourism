import React from 'react';
import CustomButton from "@/Components/Button/CustomButton";
import {Link} from "@inertiajs/react";
import Appointment from "@/models/block/Appointment";

const EditButton = (props: Appointment) => {
    return (
        <div className="m-[12px]">
            <Link
                href={`/admin/appointments/edit/${props.id}`}
            >
                <CustomButton task='display' text=""></CustomButton>
            </Link>
        </div>
    );
};

export default EditButton;
