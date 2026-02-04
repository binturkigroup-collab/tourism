import React from 'react';
import styles from "./styles.module.scss";
import {Head} from "@inertiajs/react";
import AuthAdminLayout from "@/Layouts/Admin/AuthAdminLayout";
import {Box, Card, CardContent, Paper, Typography} from "@mui/material";
import LoginForm from "@/Pages/Admin/Auth/Partials/LoginForm";
import {PageProps} from "@/types";

const Login = ({ status, canResetPassword }: PageProps<{ status?: string, canResetPassword: boolean }>) => {
    const logo = `${window.location.origin}/file/logo`;
    return (
        <AuthAdminLayout>
            <Head title="Login"></Head>
            <Box className="flex justify-center">
                <Paper elevation={3} className="register-paper">
                    <Card sx={{margin: 'auto', boxShadow: 'none'}}>
                        <Box
                            component="div"
                            className="p-2 flex justify-center items-center"
                        >
                            {/*<Box*/}
                            {/*    className="px-2"*/}
                            {/*>*/}
                            {/*    <img src={logo} alt="LOGO" className={styles.logoImg} />*/}
                            {/*</Box>*/}

                            <Typography variant="h5"><strong>Log In</strong></Typography>
                        </Box>

                        <CardContent>
                            <LoginForm status={status} canResetPassword={canResetPassword}/>
                        </CardContent>

                    </Card>
                </Paper>
            </Box>
        </AuthAdminLayout>
    );
};

export default Login;
