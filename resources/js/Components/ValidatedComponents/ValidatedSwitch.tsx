import React from "react";
import {Box, FormControlLabel, Switch} from "@mui/material";
import {Controller} from "react-hook-form";
import IValidatedSwitch from "@/Interfaces/ValidatedInput/IValidatedSwitch";
import {useForm} from "react-hook-form";

const ValidatedSwitch: React.FC<IValidatedSwitch<any>> = ({
        controlName = '',
          name = '',
          id = '',
          color="secondary",
          // // control,
          label = '',
          // required = false,
          sendSwitchState = null,
            methods,
            ...props
      }) => {
    const onSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (sendSwitchState) sendSwitchState(event.target.checked);
    }

    return (
        <Controller
            name={controlName}

            control={methods?.control}
            render={({
                         field: { value, onChange, onBlur, ref },
                         fieldState: { error },
                     }) => (
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 0 }}>
                    <FormControlLabel
                        // required={required}
                        control={
                            <Switch
                                name={name}
                                id={id}
                                color={color}
                                inputRef={ref}
                                checked={value}
                                onChange={(event, checked) => {
                                    onChange(event)
                                    onSwitchChange(event)
                                }}
                                onBlur={onBlur}
                                {...props}
                            />}
                        label={label} />
                </Box>
            )
        }/>
    );
}

export default ValidatedSwitch;
