import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Head} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import SEO from "@/Pages/Site/components/SEO";

const Careers: React.FC<{career: BlockProps []}> = ({career}) => {
    return (
        <HeaderLayout>

            <Head title={'Careers'}>
                {/*<SEO*/}
                {/*    title="Careers"*/}
                {/*    description="Join Prestige Palace Properties team. Explore career opportunities in real estate sales, marketing, investment advisory, and customer relations in Dubai's leading property consultancy."*/}
                {/*    canonical="https://https://prestigepropertydxb.com/en/careers"*/}
                {/*/>*/}
            </Head>
            <div className="p-[32px] leading-loose m-auto lg:max-w-[80%]">
                <div dangerouslySetInnerHTML={{__html: career[0].description}}>
                    {/*{privacy[0].description}*/}
                </div>
            </div>
        </HeaderLayout>
    );
};

export default Careers;
