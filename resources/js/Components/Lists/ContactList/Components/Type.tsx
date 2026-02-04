import React from 'react';
import {ContactGridProps} from "@/Components/Lists/Interfaces/ContactProps";
import CustomerType from "@/Interfaces/CustomerType";

const Type = (props: ContactGridProps) => {
    return (
        <div>
            {CustomerType[props.type]}
        </div>
    );
};

export default Type;
