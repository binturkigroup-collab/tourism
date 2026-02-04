import React from 'react';
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {Head} from "@inertiajs/react";
import {useTranslation} from "react-i18next";
import StorySection from "@/Pages/Site/About/Components/StorySection";
import HeroSection from "@/Pages/Site/About/Components/HeroSection";
import MissionVisionSection from "@/Pages/Site/About/Components/MissionVisionSection";
import SEO from "@/Pages/Site/components/SEO";
import BoardA from "@/Pages/Site/About/Components/BoardA";

const About: React.FC<{story: BlockProps [], mission: BlockProps [], vision: BlockProps [], directors: BlockProps []}> = ({story, vision, mission, directors}) => {

    return (
        <HeaderLayout>
            <Head title={'About Us'}>
                {/*<SEO*/}
                {/*    title="About Us"*/}
                {/*    description="Discover luxury real estate in Dubai with top developers like Emaar, Damac, and Nakheel. Browse premium properties, off-plan projects, and investment opportunities."*/}
                {/*    canonical="https://prestigepropertydxb.com/about-us"*/}
                {/*    structuredData={[...story, ...mission, ...vision]}*/}
                {/*/>*/}
            </Head>
            {/*<HeroSection />*/}
            {story.length > 0 && <StorySection story={story[0]}></StorySection>}

            {/*<BoardA directors={directors}/>*/}

            {mission.length > 0 && vision.length > 0 &&
                <MissionVisionSection mission={mission[0]} vision={vision[0]}></MissionVisionSection>
            }
        </HeaderLayout>
    );
};

export default About;
