import React from "react";
import IValidatedDatePicker from "@/Interfaces/ValidatedInput/IValidatedDatePicker";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Box, FormControlLabel, FormHelperText, Switch} from "@mui/material";
import {Controller} from "react-hook-form";


const ValidatedDatePicker: React.FC<IValidatedDatePicker<any>> = ({
    methods,
    label,
    controlName,
    color = 'secondary',
    slotProps,
    ...props
}) => {
    return (
        <Controller
            name={controlName}

            control={methods.control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
                     }) => (
                <Box className={'basis-full'}>
                    <DatePicker
                        label={label}
                        // name={name}
                        // id={id}
                        inputRef={ref}
                        value={value}
                        onChange={onChange}
                        slotProps={{
                            textField: {
                                color: 'secondary',
                                fullWidth: true,
                                variant: "filled",
                                onBlur: onBlur,
                            }
                        }}
                        {...props}
                        // onBlur={onBlur}
                    />

                    <FormHelperText
                        sx={{
                            color: 'error.main',
                            marginLeft: '8px',
                            marginRight: '8px',
                        }}
                    >
                        {(error?.message) ?? ''}
                    </FormHelperText>
                </Box>
            )
            }/>
        // <DatePicker />
    );
}

export default ValidatedDatePicker;
