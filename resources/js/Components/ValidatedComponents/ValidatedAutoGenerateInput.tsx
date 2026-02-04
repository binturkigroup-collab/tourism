import IValidatedInput from "@/Interfaces/ValidatedInput/IValidatedInput";
import AutogenerateInput from "@/Components/AutoGenerateInput/AutoGenerateInput";
import {Controller, FieldValues} from "react-hook-form";
import {FormHelperText} from "@mui/material";
import React from "react";



const ValidatedAutoGenerateInput: React.FC<IValidatedInput<any>> = ({
   controlName = '',
   control,
   adornment = '',
    methods,
   ...props
}) => {
    return (
        <Controller
            name={controlName}
            control={methods?.control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
                     }) => {
                const changeValue = (code: string) => {
                    methods?.setValue('code', code);
                }
                return (
                    <>
                        <AutogenerateInput {...props}
                                           onChangeInput={changeValue}
                                           initialValue={value}
                                           onBlur={onBlur}
                        >
                            <FormHelperText
                                sx={{
                                    color: 'error.main',
                                    marginLeft: '8px',
                                    marginRight: '8px',
                                }}
                            >
                                {(error?.message) ?? ''}
                            </FormHelperText>
                        </AutogenerateInput>
                    </>
                );
            }}
        />
    );
}

export default ValidatedAutoGenerateInput;
