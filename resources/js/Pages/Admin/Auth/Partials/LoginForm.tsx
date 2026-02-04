import React, {FormEventHandler, useEffect} from "react";
import styles from "./styles.module.scss";
import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel,
    FormHelperText,
    InputLabel,
} from "@mui/material";
import {z} from "zod";
import {EmailRounded, LockRounded, Visibility, VisibilityOff} from "@mui/icons-material";
import Input from "@mui/material/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, SubmitHandler, Controller, FormProvider} from "react-hook-form";
import {Link} from "@inertiajs/react";
import {useForm as formHandler} from "@inertiajs/react";
import "reflect-metadata";
import ValidatedInput from "@/Components/ValidatedComponents/ValidatedInput";

const LoginForm = ({ status, canResetPassword }: { status?: string, canResetPassword: boolean}) => {
    const {data, setData, post, processing, errors, reset} = formHandler({
        email: '',
        password: '',
        remember: false,
    });

    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('change', (e: any) => {
            errors.email = '';
            setData('email', e.target.value)
        });
    }

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        errors.password = '';
        passwordInput.addEventListener('change', (e: any) => {
            setData('password', e.target.value)
        });
    }

    const rememberInput = document.getElementById('remember');
    if (rememberInput) {
        rememberInput.addEventListener('change', (e: any) => {
            setData('remember', e.target.value)
        });
    }

    // document.addEventListener('change', )

    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        // remember: z.boolean(),
    });

    type LoginSchemaType = z.infer<typeof loginSchema>;

    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            // remember: false,
        }
    });
    const onSubmit:  SubmitHandler<LoginSchemaType> = async (formData) => {
        await post(route('admin.login'));
    }

    useEffect(() => {
        return () => {
            reset('password');
            methods.reset({
                password: "",
            })
        };
    }, [emailInput, passwordInput, rememberInput]);

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <ValidatedInput
                    name="email"
                    id="email"
                    type="email"
                    controlName="email"
                    methods={methods}
                    label="Email"
                    placeholder="example@email.com"
                    errors={errors.email}
                ></ValidatedInput>

                <ValidatedInput
                    name="password"
                    id="password"
                    type="password"
                    controlName="password"
                    methods={methods}
                    label="Password"
                    // placeholder="example@email.com"
                    errors={errors.password}
                ></ValidatedInput>


                {/*<Controller*/}
                {/*    name="remember"*/}

                {/*    control={methods.control}*/}
                {/*    render={({*/}
                {/*                 field: { value, onChange, onBlur, ref },*/}
                {/*                 fieldState: { error },*/}
                {/*             }) => (*/}
                {/*        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 1 }}>*/}
                {/*            <FormControlLabel*/}
                {/*                required*/}
                {/*                control={*/}
                {/*                    <Checkbox*/}
                {/*                        name="remember"*/}
                {/*                        id="remember"*/}
                {/*                        required*/}
                {/*                        inputRef={ref}*/}
                {/*                        value={value}*/}
                {/*                        onChange={onChange}*/}
                {/*                        onBlur={onBlur}*/}
                {/*                    />}*/}
                {/*                label="Remember me" />*/}
                {/*        </Box>*/}
                {/*    )}*/}
                {/*/>*/}

                {/*<div className="flex content-start items-center mt-3">*/}
                {/*    {canResetPassword && <Link*/}
                {/*        href={route('password.request')}*/}
                {/*        className="underline mx-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none"*/}
                {/*    >*/}
                {/*        Forgot your password?*/}
                {/*    </Link>}*/}
                {/*</div>*/}

                <div className="flex justify-between items-center mt-3">
                    <Button type="submit" variant="outlined" disabled={processing}>Login</Button>
                </div>
            </Box>
        </FormProvider>

    );
}

export default LoginForm;
