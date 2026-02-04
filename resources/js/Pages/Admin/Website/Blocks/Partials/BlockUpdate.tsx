import React from 'react';
import CommonService from "@/Services/CommonService/CommonService";
import {Container} from "typedi";
import "reflect-metadata";
import {PageProps} from "@/types";
import {Head, Link} from "@inertiajs/react";
import AdminLayout from "@/Layouts/Admin/AdminLayout";
import {Block} from "@/models/block/Block";
import BlockCategories from "@/Enums/BlockCategories";
import Project from "@/models/block/Project";
import TurnUpdate from "@/Pages/Admin/Website/Blocks/About/TurnOurVisionIntoValue/TurnUpdate";
import StoryUpdate from "@/Pages/Admin/Website/Blocks/About/OurStory/StoryUpdate";
import MissionUpdate from "@/Pages/Admin/Website/Blocks/About/OurMission/MissionUpdate";
import VisionUpdate from "@/Pages/Admin/Website/Blocks/About/OurVision/VisionUpdate";
import TalentedUpdate from "@/Pages/Admin/Website/Blocks/About/Talented/TalentedUpdate";
import MainSectionUpdate from "@/Pages/Admin/Website/Blocks/MainSection/MainSectionUpdate";
import Agent from "@/models/block/Agent";
import PrivacyPolicyUpdate from "@/Pages/Admin/Website/Blocks/PrivacyPolicy/PrivacyPolicyUpdate";
import ConditionsUpdate from "@/Pages/Admin/Website/Blocks/Conditions/ConditionsUpdate";
import CareersUpdate from "@/Pages/Admin/Website/Blocks/Careers/CareersUpdate";
import DirectorsUpdate from "@/Pages/Admin/Website/Blocks/About/Directors/DirectorsUpdate";
import TagUpdate from '@/Pages/Admin/Tourism/Tags/TagUpdate';
import TripUpdate from "@/Pages/Admin/Tourism/Trips/TripUpdate/TripUpdate";
import CityUpdate from '@/Pages/Admin/Tourism/Cities/CityUpdate';
import Trip from "@/models/block/Trip";
import AppointmentUpdate from "@/Pages/Admin/Tourism/Appointments/AppointmentUpdate";
import BlogUpdate from "@/Pages/Admin/Website/Blocks/Blog/BlogUpdate";


const BlockUpdate = ({category, block}: PageProps<{category: string, block: Block}>) => {
    const commonService = Container.get(CommonService);
    const categories = Object.values(BlockCategories);
    let UpdateComponent;

    switch (commonService.toTitleCase(category)) {

        // case BlockCategories.ABOUT: {
        //     UpdateComponent = () => <AboutUpdate block={block} category={category}></AboutUpdate>;
        //     break;
        // }
        case BlockCategories.MAIN_SECTION: {
            UpdateComponent = () => <MainSectionUpdate block={block} category={category}></MainSectionUpdate>;
            break;
        }
        case BlockCategories.TURN_OUR_VISION_INTO_VALUE: {
            UpdateComponent = () => <TurnUpdate block={block} category={category}></TurnUpdate>;
            break;
        }
        case BlockCategories.OUR_BOARD_OF_DIRECTORS: {
            UpdateComponent = () => <DirectorsUpdate block={block} category={category}></DirectorsUpdate>;
            break;
        }
        case BlockCategories.OUR_STORY: {
            UpdateComponent = () => <StoryUpdate block={block} category={category}></StoryUpdate>;
            break;
        }
        case BlockCategories.OUR_MISSION: {
            UpdateComponent = () => <MissionUpdate block={block} category={category}></MissionUpdate>;
            break;
        }
        case BlockCategories.OUR_VISION: {
            UpdateComponent = () => <VisionUpdate block={block} category={category}></VisionUpdate>;
            break;
        }
        case BlockCategories.OUR_CREATIVE_TALENTS: {
            UpdateComponent = () => <TalentedUpdate block={block} category={category}></TalentedUpdate>;
            break;
        }


        case BlockCategories.CITY: {
            UpdateComponent = () => <CityUpdate block={block} category={category}></CityUpdate>;
            break;
        }

        case BlockCategories.PRIVACY: {
            UpdateComponent = () => <PrivacyPolicyUpdate block={block as Agent} category={category}></PrivacyPolicyUpdate>;
            break;
        }

        case BlockCategories.CONDITION: {
            UpdateComponent = () => <ConditionsUpdate block={block as Agent} category={category}></ConditionsUpdate>;
            break;
        }

        case BlockCategories.CAREER: {
            UpdateComponent = () => <CareersUpdate block={block as Agent} category={category}></CareersUpdate>;
            break;
        }

        case BlockCategories.TAG: {
            UpdateComponent = () => <TagUpdate block={block} category={category}></TagUpdate>;
            break;
        }

        case BlockCategories.TRIP: {
            UpdateComponent = () => <TripUpdate block={block as Trip} category={category}></TripUpdate>;
            break;
        }

        // case BlockCategories.APPOINTMENT: {
        //     UpdateComponent = () => <AppointmentUpdate block={block as Trip} category={category}></AppointmentUpdate>;
        //     break;
        // }

        case BlockCategories.BLOG: {
            UpdateComponent = () => <BlogUpdate block={block as Agent} category={category}></BlogUpdate>;
            break;
        }

        default: {
            UpdateComponent = () => <TripUpdate block={block as Trip} category={category}></TripUpdate>
        }
    }

    const getTitle = () => {
        return commonService.toTitleCase(category);
    }
    return (
        <AdminLayout>
            <Head title={'Update ' + getTitle()}></Head>
            <UpdateComponent></UpdateComponent>
        </AdminLayout>
    );
}

export default BlockUpdate;
