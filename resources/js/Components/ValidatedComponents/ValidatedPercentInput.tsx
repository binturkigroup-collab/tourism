import React from "react";
import IValidatedPercentInput from "@/Interfaces/ValidatedInput/IValidatedPercentInput";
import {Box} from "@mui/material";
import ValidatedSwitch from "@/Components/ValidatedComponents/ValidatedSwitch";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";
const ValidatedPercentInput: React.FC<IValidatedPercentInput<any>> = ({
    methods,
    switchControlName,
    inputControlName,
      switchName,
      switchId,
      switchLabel,
      inputName,
      inputId,
      inputLabel,
      sendSwitchState,
    ...props

}) => {
    const [isPercent, setIsPercent] = React.useState<boolean>(true);
    const currency = 'AED';
    const percentSymbol = '%';

    const handSwitchChange = (value: boolean) => {
        setIsPercent(value);
        sendSwitchState(value)
    }

    return (
        <Box>
            <ValidatedSwitch
                controlName={switchControlName}
                id={switchId}
                name={switchName}
                label={switchLabel}
                color="secondary"
                methods={methods}
                sendSwitchState={handSwitchChange}
                {...props}
                />
            <ValidatedInput
                controlName={inputControlName}
                id={inputId}
                name={inputName}
                label={inputLabel}
                color="secondary"
                methods={methods}
                adornment={isPercent ? percentSymbol : currency}
                {...props}
            />
        </Box>
    );
}

export default ValidatedPercentInput;
