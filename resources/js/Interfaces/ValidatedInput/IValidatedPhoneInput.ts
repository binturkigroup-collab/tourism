import {BaseTextFieldProps} from "@mui/material/TextField";
import {type Control, UseFormReturn} from "react-hook-form";
import {type FieldValues, Resolver} from "react-hook-form";
import IMasterValidated from "@/Interfaces/ValidatedInput/IMasterValidated";


interface IValidatedPhoneInput<T extends FieldValues=FieldValues> extends BaseTextFieldProps, IMasterValidated<T> {
    control?: Control<T, any>,
    controlName: string,
    errors?: string,
}

export default IValidatedPhoneInput;
