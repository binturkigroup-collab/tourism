import {BaseTextFieldProps} from "@mui/material/TextField";
import {type Control, UseFormReturn} from "react-hook-form";
import {type FieldValues, Resolver} from "react-hook-form";
import IMasterValidated from "@/Interfaces/ValidatedInput/IMasterValidated";


interface IValidatedInput<T extends FieldValues=FieldValues> extends BaseTextFieldProps, IMasterValidated<T> {
    control?: Control<T, any>,
    controlName: string,
    adornment?: string,
    errors?: string,
    languageCode?: string,
    maxLength?: number,
    // methods?: UseFormReturn<T, any, undefined>
}

export default IValidatedInput;
