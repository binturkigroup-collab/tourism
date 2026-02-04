import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Head} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";

const Privacy: React.FC<{privacy: BlockProps []}> = ({privacy}) => {
    return (
        <HeaderLayout>
            <Head title={'Privacy Policy'}>
                {/*<SEO*/}
                {/*    title="Privacy Policy"*/}
                {/*    description="Prestige Palace privacy policy. Learn how we collect, use, and protect your personal information when using our real estate services and website."*/}
                {/*    canonical="https://prestigepropertydxb.com/en/privacy-policy"*/}
                {/*/>*/}
            </Head>

            <div className="p-[16px] leading-loose m-auto lg:max-w-[80%]">
                <div dangerouslySetInnerHTML={{__html: privacy[0].description}}>
                    {/*{privacy[0].description}*/}
                </div>
            </div>

        </HeaderLayout>
    );
};

export default Privacy;
