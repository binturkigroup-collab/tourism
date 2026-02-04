import {DatePickerProps} from "@mui/x-date-pickers/DatePicker";
import {FieldValues, UseFormReturn} from "react-hook-form";

interface IValidatedDatePicker<T extends FieldValues> extends DatePickerProps<true>{
    methods: UseFormReturn<T, any>,
    controlName: string;
    label: string,
    color?: string,
}

export default IValidatedDatePicker;
