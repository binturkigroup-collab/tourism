import React from 'react';
import CustomButton from "@/Components/Button/CustomButton";
import {Link} from "@inertiajs/react";
import {BlockGridProps} from "../../Interfaces";
import {ContactGridProps} from "@/Components/Lists/Interfaces/ContactProps";

const EditButton = (props: ContactGridProps) => {
    return (
        <Link href={`/admin/contact/${props.id}`} className="py-[8px]">
            <CustomButton task='display' text=""></CustomButton>
        </Link>
    );
};

export default EditButton;
