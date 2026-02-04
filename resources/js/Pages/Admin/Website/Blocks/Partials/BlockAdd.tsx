import React from 'react';
import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";
import BlockCategories from "@/Enums/BlockCategories";
import TurnAdd from "@/Pages/Admin/Website/Blocks/About/TurnOurVisionIntoValue/TurnAdd";
import StoryAdd from "@/Pages/Admin/Website/Blocks/About/OurStory/StoryAdd";
import MissionAdd from "@/Pages/Admin/Website/Blocks/About/OurMission/MissionAdd";
import VisionAdd from "@/Pages/Admin/Website/Blocks/About/OurVision/VisionAdd";
import TalentedAdd from "@/Pages/Admin/Website/Blocks/About/Talented/TalentedAdd";
import MainSectionAdd from "@/Pages/Admin/Website/Blocks/MainSection/MainSectionAdd";
import CityAdd from "@/Pages/Admin/Tourism/Cities/CityAdd";
import PrivacyPolicyAdd from "@/Pages/Admin/Website/Blocks/PrivacyPolicy/PrivacyPolicyAdd";
import ConditionsAdd from "@/Pages/Admin/Website/Blocks/Conditions/ConditionsAdd";
import CareersAdd from "@/Pages/Admin/Website/Blocks/Careers/CareersAdd";
import DirectorsAdd from "../About/Directors/DirectorsAdd";
import TagAdd from '@/Pages/Admin/Tourism/Tags/TagAdd';
import TripAdd from '@/Pages/Admin/Tourism/Trips/TripAdd';
import AppointmentAdd from "@/Pages/Admin/Tourism/Appointments/AppointmentAdd";
import BlogAdd from "@/Pages/Admin/Website/Blocks/Blog/BlogAdd";

const BlockAdd = ({category}: PageProps<{category: string}>) => {
    const commonService = Container.get(CommonService);
    const categories = Object.values(BlockCategories);
    let AddComponent;

    switch (commonService.toTitleCase(category)) {
        // case BlockCategories.ABOUT: {
        //     AddComponent = () => <AboutAdd category={category}></AboutAdd>;
        //     break;
        // }
        case BlockCategories.MAIN_SECTION: {
            AddComponent = () => <MainSectionAdd category={category}></MainSectionAdd>;
            break;
        }

        case BlockCategories.TURN_OUR_VISION_INTO_VALUE: {
            AddComponent = () => <TurnAdd category={category}></TurnAdd>;
            break;
        }
        case BlockCategories.OUR_BOARD_OF_DIRECTORS: {
            AddComponent = () => <DirectorsAdd category={category}></DirectorsAdd>
            break;
        }
        case BlockCategories.OUR_STORY: {
            AddComponent = () => <StoryAdd category={category}></StoryAdd>;
            break;
        }
        case BlockCategories.OUR_MISSION: {
            AddComponent = () => <MissionAdd category={category}></MissionAdd>;
            break;
        }
        case BlockCategories.OUR_VISION: {
            AddComponent = () => <VisionAdd category={category}></VisionAdd>;
            break;
        }
        case BlockCategories.OUR_CREATIVE_TALENTS: {
            AddComponent = () => <TalentedAdd category={category}></TalentedAdd>;
            break;
        }

        case BlockCategories.CITY: {
            AddComponent = () => <CityAdd category={category}></CityAdd>
            break;
        }

        case BlockCategories.PRIVACY: {
            AddComponent = () => <PrivacyPolicyAdd category={category}></PrivacyPolicyAdd>
            break;
        }

        case BlockCategories.CONDITION: {
            AddComponent = () => <ConditionsAdd category={category}></ConditionsAdd>
            break;
        }

        case BlockCategories.CAREER: {
            AddComponent = () => <CareersAdd category={category}></CareersAdd>
            break;
        }

        case BlockCategories.TAG: {
            AddComponent = () => <TagAdd category={category}></TagAdd>
            break;
        }

        case BlockCategories.TRIP: {
            AddComponent = () => <TripAdd category={category}></TripAdd>
            break;
        }

        case BlockCategories.APPOINTMENT: {
            AddComponent = () => <AppointmentAdd category={category}></AppointmentAdd>
            break;
        }

        case BlockCategories.BLOG: {
            AddComponent = () => <BlogAdd category={category}></BlogAdd>
            break;
        }

        // default: {
        //     AddComponent = () => <ProjectAdd category={category}></ProjectAdd>
        // }
    }

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }
    return (
        <AdminLayout>
            <Head title={'Add ' + getTitle()}></Head>
            <AddComponent></AddComponent>
        </AdminLayout>
    );
}

export default BlockAdd;
