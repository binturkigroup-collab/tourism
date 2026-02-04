import React from "react";

import AdminLayout from "@/Layouts/Admin/AdminLayout";
import {Head, usePage} from "@inertiajs/react";

const Home = () => {
    // const user = usePage().props.auth.user;
    return (
        <AdminLayout>
            <Head title="Home"></Head>
        </AdminLayout>
    );
}

export default Home;
