import HeaderLayout from '@/Layouts/Site/HeaderLayout';
import React from 'react';
import { Head } from '@inertiajs/react';
import TripProps from "@/Interfaces/Site/TripProps";
import PackageList from "@/Pages/Site/Home/Components/Packages";

const Packages: React.FC<{packages: TripProps[]}> = ({packages}) => {
    return (
        <HeaderLayout>
            <Head title={'Packages'} />
            {/*</Head>*/}

            <PackageList packages={packages}></PackageList>
        </HeaderLayout>
    )
};

export default Packages;
