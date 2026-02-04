import {SelectChangeEvent, SelectProps} from "@mui/material";
import {Control, FieldValues} from "react-hook-form";
import SelectItemsProps from "@/Interfaces/SelectItemsProps";
import {BaseSelectProps} from "@mui/material/Select";

interface IValidatedSelect<T extends FieldValues> extends BaseSelectProps{
    control: Control<T, any>,
    controlName: string,
    placeholder: string,
    items: SelectItemsProps [],
    withNone?: boolean,
    selectChanged?: (event: SelectChangeEvent<unknown>) => void,
}

export default IValidatedSelect;
