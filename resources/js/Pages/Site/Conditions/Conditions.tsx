import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Head} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import SEO from "@/Pages/Site/components/SEO";

const Conditions: React.FC<{conditions: BlockProps []}> = ({conditions}) => {
    return (
        <HeaderLayout>
            <Head title={'Conditions'}>
                {/*<SEO*/}
                {/*    title="Conditions and Terms"*/}
                {/*    description="Prestige Palace Coditions and Terms. Learn how we collect, use, and protect your personal information when using our real estate services and website."*/}
                {/*    canonical="https://prestigepropertydxb.com/en/privacy-policy"*/}
                {/*/>*/}
            </Head>
            <div className="p-[32px] leading-loose m-auto lg:max-w-[80%]">
                <div dangerouslySetInnerHTML={{__html: conditions[0].description}}>
                    {/*{privacy[0].description}*/}
                </div>
            </div>
        </HeaderLayout>
    );
};

export default Conditions;
