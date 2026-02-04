import React from 'react';
import IValidatedInput from "@/Interfaces/ValidatedInput/IValidatedInput";
import MySyncfusionEditor from "@/Components/CKEditor/Syncfusion/MySyncfusionEditor";
import {Box, FormHelperText, TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {Controller} from "react-hook-form";
import {RichTextEditorComponent} from "@syncfusion/ej2-react-richtexteditor";

const ValidatedTextEditor: React.FC<IValidatedInput<any>> = ({
     name = '',
     controlName = '',
     control,
     id = '',
     label = '',
     placeholder = '',
     multiline = false,
     rows = 1,
     adornment = '',
     methods= undefined,
     errors = '',
     languageCode = '',
    maxLength = 100,
     ...props
 }) => {
    return (
        <Controller
            name={controlName}
            control={methods?.control || control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
                     }) => {
                const onTextEditorChanged = (event: string) => {
                    methods?.setValue(controlName, event);
                }
                return (
                    <Box>
                        <MySyncfusionEditor
                            id={id}
                            name={name}
                            value={value}
                            onBlur={onTextEditorChanged}
                            placeholder={placeholder}
                            label={label}
                            inputRef={ref}
                            error={error}
                            languageCode={languageCode}
                            maxLength={maxLength}
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
                );
            }
        }
        />
    );
};

export default ValidatedTextEditor;
