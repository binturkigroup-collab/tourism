import React from "react";
import {Controller} from "react-hook-form";
import IValidatedSelect from "@/Interfaces/ValidatedInput/IValidatedSelect";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material"


const ValidatedSelect: React.FC<IValidatedSelect<any>> = ({
            control,
            controlName,
            id,
            label = '',
            placeholder = '',
            items = [],
            withNone = true,
            selectChanged,
            ...props
      }) => {
    return (
        <Controller
            name={controlName}
            control={control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
             }) => (
                <FormControl
                    variant="filled" sx={{ m: 1 }}
                    className="w-full"
                    color="secondary"
                >
                    <InputLabel id={label?.toString()}>{placeholder}</InputLabel>
                    <Select
                        labelId={label?.toString()}
                        id={id}
                        value={value}
                        ref={ref}
                        onChange={(event) => {
                            onChange(event);
                            selectChanged && selectChanged(event)
                        }}
                        color="secondary"
                        error={Boolean(error)}
                        {...props}
                    >
                        {withNone && <MenuItem value={-1}>
                            <em>None</em>
                        </MenuItem>}
                        {items.map((item, key) => (
                            <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
                        ))}
                    </Select>

                    <FormHelperText
                        sx={{
                            color: 'error.main',
                            marginLeft: '8px',
                            marginRight: '8px',
                        }}
                    >
                        {(error?.message) ?? ''}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
}

export default ValidatedSelect;
