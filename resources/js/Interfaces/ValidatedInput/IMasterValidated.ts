import {FieldValues, UseFormReturn} from "react-hook-form";

interface IMasterValidated<T extends FieldValues=FieldValues> {
    methods?: UseFormReturn<T, undefined>,
}

export default IMasterValidated;
