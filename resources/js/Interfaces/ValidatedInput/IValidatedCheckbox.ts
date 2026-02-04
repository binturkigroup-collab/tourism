import {Control, FieldValues} from "react-hook-form";
import {CheckboxProps} from "@mui/material/Checkbox";

interface IValidatedCheckbox<T extends FieldValues> extends CheckboxProps{
    control: Control<T, any>,
    label: string,
    required?: boolean,
}

export default IValidatedCheckbox;
