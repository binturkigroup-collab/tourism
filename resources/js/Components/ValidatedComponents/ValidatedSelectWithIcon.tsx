import React from "react";
import {Controller} from "react-hook-form";
import IValidatedSelect from "@/Interfaces/ValidatedInput/IValidatedSelect";
import CustomIcon from "@/Components/Icon/Icon";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select, Stack,
} from "@mui/material"
import ListItemText from "@mui/material/ListItemText";


const ValidatedSelectWithIcon: React.FC<IValidatedSelect<any>> = ({
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
                            <MenuItem value={item.id} key={key}>
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={2}
                                    className="m-[8px]"
                                >
                                    <CustomIcon name={item.id as string}></CustomIcon>
                                    <ListItemText>{item.name}</ListItemText>
                                </Stack>
                            </MenuItem>
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

export default ValidatedSelectWithIcon;
