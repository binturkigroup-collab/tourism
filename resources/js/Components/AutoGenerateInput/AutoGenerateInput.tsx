import React from "react";
import {BaseTextFieldProps} from "@mui/material/TextField";
import CustomButton from "@/Components/Button/CustomButton";
import {Box, TextField} from "@mui/material";
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";

const AutogenerateInput: React.FC<BaseTextFieldProps &
    {
        onChangeInput: (code: string) => void,
        initialValue: string,
        children: React.ReactNode,
        // onBlur: Noop,
    }> = (
        {
            children,
            onChangeInput,
            initialValue,
            ...props
        }
) => {
    const commonService = Container.get(CommonService);
    const [code, setCode] = React.useState<string>(initialValue);

    const handleClick = () => {
        setCode(commonService.randomString(16, 'aA#'));
    }
    const handyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    }

    React.useEffect(() => {
        onChangeInput(code);
    }, [code])
    return (
        <>
            <TextField
                color="secondary"
                value={code}
                onChange={handyChange}
                // onBlur={onBlur}
                fullWidth
                {...props}
                inputProps={{
                    form: {
                        autocomplete: 'off',
                    },
                }}
                required
            />

            {children}

            <Box className="p-[16px]">
                <CustomButton
                    task="generate"
                    text="code"
                    className="basis-[200px]"
                    onClick={handleClick}
                ></CustomButton>
            </Box>
        </>

    );
}

export default AutogenerateInput;

