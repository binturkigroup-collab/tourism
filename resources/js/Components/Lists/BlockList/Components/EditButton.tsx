import React from 'react';
import CustomButton from "@/Components/Button/CustomButton";
import {Link} from "@inertiajs/react";
import {BlockGridProps} from "../../Interfaces";

const EditButton = (props: BlockGridProps) => {
    return (
        <Link href={`/admin/block/details/${props.id}`}>
            <CustomButton task='display' text=""></CustomButton>
        </Link>
    );
};

export default EditButton;
