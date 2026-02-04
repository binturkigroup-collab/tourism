import React from 'react';
import IValidatedInput from "@/Interfaces/ValidatedInput/IValidatedInput";
import { Controller } from "react-hook-form";
import { Box, TextField, InputAdornment,  FormHelperText} from "@mui/material";
import PhoneInput, {Value, isValidPhoneNumber} from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import {useAppSelector} from "@/Redux/Store/hook";
import IValidatedPhoneInput from "@/Interfaces/ValidatedInput/IValidatedPhoneInput";

const ValidatedPhoneInput: React.FC<IValidatedPhoneInput<any>> = ({
        name = '',
        controlName = '',
        control,
        methods,
        errors,
        ...props
 }) => {
    const theme = useAppSelector(state => state.theme)
    const handlePhoneNumber = (value: Value) => {
        try {
            console.log(value, isValidPhoneNumber(value));
            if (!isValidPhoneNumber(value)) {
                methods && methods.setError('phone', {type: 'validate', message: 'Invalid Phone Number'});
            } else {
                methods && methods.setValue('phone', value);
            }
        } catch (error) {
            console.log(error);
            methods && methods.setError('phone', {type: 'validate', message: "Use Only numbers"})
        }

    }

    return (
        <Controller
            name={controlName}
            control={methods?.control || control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
                     }) => (
                <Box className={theme.dark ? 'dark': 'light'}>
                    <PhoneInput
                        id={name}
                        name={name}
                        placeholder="Enter phone number"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={ref}
                        error={Boolean(error)}
                    />

                    <FormHelperText
                        sx={{
                            color: 'error.main',
                            marginLeft: '8px',
                            marginRight: '8px',
                        }}
                    >
                        {(error?.message) ?? errors}
                    </FormHelperText>
                </Box>
            )}
        />
    );
};

export default ValidatedPhoneInput;
