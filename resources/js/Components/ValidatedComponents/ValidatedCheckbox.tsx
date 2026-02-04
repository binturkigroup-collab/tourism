import React from "react";
import IValidatedCheckbox from "@/Interfaces/ValidatedInput/IValidatedCheckbox";
import {Box, Checkbox, FormControlLabel} from "@mui/material";
import {Controller} from "react-hook-form";

const ValidatedCheckbox: React.FC<IValidatedCheckbox<any>> = ({
    name = '',
    id = '',
    color="secondary",
    control,
    label = '',
    required = false,

    }) => {
    return (
        <Controller
            name={name}

            control={control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
                     }) => (
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>
                    <FormControlLabel
                        required={required}
                        control={
                            <Checkbox
                                name={name}
                                id={id}
                                color={color}
                                inputRef={ref}
                                // defaultChecked={value}
                                checked={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />}
                        label={label} />
                </Box>
            )}
        />
    );
}

export default ValidatedCheckbox;
