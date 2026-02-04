import UploadImageProps from "@/Interfaces/ValidatedInput/IUploadImage";
import {Control, FieldValues, UseFormReturn} from "react-hook-form";

interface IValidatedImage<T extends FieldValues> {
    controllerName: string,
    methods: UseFormReturn<T, any>,
    image?: string | null,
    onUpload?: () => void | null,
}

export default IValidatedImage;
