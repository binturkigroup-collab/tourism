import BlockCategories from "@/Enums/BlockCategories";
import {Container} from "typedi";
import CommonService from "@/Services/CommonService/CommonService";
import "reflect-metadata";
import MenuCategories from "@/Enums/MenuCategories";

const commonService = Container.get(CommonService);

export type CustomTab = {
    name: string,
    icon: string,
    link: string,
    children: CustomTab [],
};

const SidebarList: CustomTab [] = [
    {
        name: 'Home',
        icon: 'home',
        link: '/admin',
        children: [],
    },

    {
        name: BlockCategories.WEBSITE,
        icon: 'main-section',
        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.MAIN_SECTION),
        children: [
            {
                name: BlockCategories.MAIN_SECTION,
                icon: 'main-section',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.MAIN_SECTION),
                children: [],
            },

            {
                name: BlockCategories.ABOUT,
                icon: 'about-us',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.ABOUT),
                children: [
                    {
                        name: BlockCategories.TURN_OUR_VISION_INTO_VALUE,
                        icon: 'about-us',
                        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.TURN_OUR_VISION_INTO_VALUE),
                        children: [],
                    },
                    {
                        name: BlockCategories.OUR_BOARD_OF_DIRECTORS,
                        icon: 'about-us',
                        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_BOARD_OF_DIRECTORS),
                        children: [],
                    },
                    {
                        name: BlockCategories.OUR_STORY,
                        icon: 'about-us',
                        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_STORY),
                        children: [],
                    },
                    {
                        name: BlockCategories.OUR_VISION,
                        icon: 'about-us',
                        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_VISION),
                        children: [],
                    },

                    {
                        name: BlockCategories.OUR_MISSION,
                        icon: 'about-us',
                        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_MISSION),
                        children: [],
                    },

                    {
                        name: BlockCategories.OUR_CREATIVE_TALENTS,
                        icon: 'about-us',
                        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_CREATIVE_TALENTS),
                        children: [],
                    },
                ],
            },

            {
                name: BlockCategories.BLOG,
                icon: 'main-section',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.BLOG),
                children: [],
            },


            {
                name: BlockCategories.PRIVACY,
                icon: 'main-section',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.PRIVACY),
                children: [],
            },

            {
                name: BlockCategories.CONDITION,
                icon: 'main-section',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.CONDITION),
                children: [],
            },

            {
                name: BlockCategories.CAREER,
                icon: 'main-section',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.CAREER),
                children: [],
            },

            {
                name: BlockCategories.CONTACT,
                icon: 'main-section',
                link: '/admin/contact/',
                children: [],
            }
        ],
    },

    // {
    //     name: BlockCategories.MAIN_SECTION,
    //     icon: 'main-section',
    //     link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.MAIN_SECTION),
    //     children: [],
    // },

    // {
    //     name: BlockCategories.ABOUT,
    //     icon: 'about-us',
    //     link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.ABOUT),
    //     children: [
    //         {
    //             name: BlockCategories.TURN_OUR_VISION_INTO_VALUE,
    //             icon: 'about-us',
    //             link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.TURN_OUR_VISION_INTO_VALUE),
    //             children: [],
    //         },
    //         {
    //             name: BlockCategories.OUR_STORY,
    //             icon: 'about-us',
    //             link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_STORY),
    //             children: [],
    //         },
    //         {
    //             name: BlockCategories.OUR_VISION,
    //             icon: 'about-us',
    //             link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_VISION),
    //             children: [],
    //         },
    //
    //         {
    //             name: BlockCategories.OUR_MISSION,
    //             icon: 'about-us',
    //             link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_MISSION),
    //             children: [],
    //         },
    //
    //         {
    //             name: BlockCategories.OUR_CREATIVE_TALENTS,
    //             icon: 'about-us',
    //             link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.OUR_CREATIVE_TALENTS),
    //             children: [],
    //         },
    //     ],
    // },

    {
        name: BlockCategories.TOURISM,
        icon: 'tourism',
        link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.TOURISM),
        children: [
            {
                name: BlockCategories.TAG,
                icon: 'services',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.TAG),
                children: [],
            },

            {
                name: BlockCategories.CITY,
                icon: 'city',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.CITY),
                children: [],
            },

            {
                name: BlockCategories.TRIP,
                icon: 'trip',
                link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.TRIP),
                children: [],
            },

            {
                name: BlockCategories.APPOINTMENT,
                icon: 'appointment',
                link: '/admin/appointments',
                children: [],
            },

            {
                name: 'Leads',
                icon: 'main-section',
                link: '/admin/leads',
                children: [],
            }

            // {
            //     name: BlockCategories.PROJECTS,
            //     icon: 'main-section',
            //     link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.PROJECTS),
            //     children: [],
            // },
            //
            // {
            //     name: BlockCategories.PROPERTY,
            //     icon: 'main-section',
            //     link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.PROPERTY),
            //     children: [],
            // },
            //
            // {
            //     name: BlockCategories.AGENT,
            //     icon: 'main-section',
            //     link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.AGENT),
            //     children: [],
            // },
            //
            // {
            //     name: BlockCategories.CITY,
            //     icon: 'main-section',
            //     link: '/admin/get-block/' + commonService.toSnakeCase(BlockCategories.CITY),
            //     children: [],
            // },
            //
            // {
            //     name: 'Leads',
            //     icon: 'main-section',
            //     link: '/admin/leads',
            //     children: [],
            // }
        ],
    },

    {
        name: MenuCategories.MENU,
        icon: 'main-menu',
        link: '/admin/get-menu/' + commonService.toSnakeCase(MenuCategories.MAIN_MENU),
        children: [
            {
                name: MenuCategories.MAIN_MENU,
                icon: 'main-menu',
                link: '/admin/get-menu/' + commonService.toSnakeCase(MenuCategories.MAIN_MENU),
                children: [],
            },

            {
                name: MenuCategories.SOCIAL_MENU,
                icon: 'social-menu',
                link: '/admin/get-menu/' + commonService.toSnakeCase(MenuCategories.SOCIAL_MENU),
                children: [],
            },

            {
                name: MenuCategories.CONTACT_MENU,
                icon: 'contact-menu',
                link: '/admin/get-menu/' + commonService.toSnakeCase(MenuCategories.CONTACT_MENU),
                children: [],
            },

            {
                name: MenuCategories.FOOTER_MENU,
                icon: 'footer-menu',
                link: '/admin/get-menu/' + commonService.toSnakeCase(MenuCategories.FOOTER_MENU),
                children: [],
            },
        ],
    },



    // {
    //     name: 'Settings',
    //     icon: 'settings',
    //     link: '/admin/setting',
    //     children: [
    //         {
    //             name: 'Languages',
    //             icon: 'language',
    //             link: '/admin/setting/language',
    //             children: [],
    //         },
    //     ],
    // },
];

export default SidebarList;
