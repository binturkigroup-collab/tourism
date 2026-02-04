import {FieldValues} from "react-hook-form";
import IMasterValidated from "@/Interfaces/ValidatedInput/IMasterValidated";

interface IValidatedPercentInput<T extends FieldValues> extends IMasterValidated<T>{
    switchControlName: string;
    inputControlName: string;
    switchName: string,
    switchId: string,
    switchLabel: string,
    inputName: string,
    inputId: string,
    inputLabel: string,
    sendSwitchState: (boolean) => void,
}

export default IValidatedPercentInput;
