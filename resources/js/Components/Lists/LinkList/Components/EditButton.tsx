import React from 'react';
import CustomButton from "@/Components/Button/CustomButton";
import {Link} from "@inertiajs/react";
import {MenuGridProps} from "../../Interfaces";

const EditButton = (props: MenuGridProps) => {
    return (
        <Link href={`/admin/menu/details/${props.id}`}>
            <CustomButton task='display' text=""></CustomButton>
        </Link>
    );
};

export default EditButton;
