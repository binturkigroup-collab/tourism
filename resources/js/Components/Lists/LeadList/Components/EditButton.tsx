import React from 'react';
import Lead from "@/models/lead/Lead";
import CustomButton from "@/Components/Button/CustomButton";
import {Link} from "@inertiajs/react";

const EditButton = (props: Lead) => {
    return (
        <Link href={`/admin/lead/get-lead/${props.id}`}>
            <CustomButton task='display' text=""></CustomButton>
        </Link>
    );
};

export default EditButton;
