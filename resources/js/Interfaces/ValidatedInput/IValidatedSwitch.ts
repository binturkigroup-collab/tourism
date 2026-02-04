import {Control, FieldValues, UseFormReturn} from "react-hook-form";
import {CheckboxProps} from "@mui/material/Checkbox";
import {SwitchProps} from "@mui/material/Switch";
import IMasterValidated from "@/Interfaces/ValidatedInput/IMasterValidated";

interface IValidatedSwitch<T extends FieldValues> extends SwitchProps, IMasterValidated<T>{
    // methods: UseFormReturn<T, any>,
    controlName: string,
    label: string,
    required?: boolean,
    sendSwitchState?: (value: boolean) => void | null
}

export default IValidatedSwitch;
