// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     email_verified_at: string;
// }

import Account from "@/Components/Account/Account";
import Language from "@/models/language/Language";
import Like from "@/models/product/Like";
import Favorite from "@/models/product/Favorite";
import Review from "@/models/product/Review";
import Rating from "@/models/product/Rating";
import MenuLink from "@/models/Link/MenuLink";
import TripProps from "@/Interfaces/Site/TripProps";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar: string;
    isActive: boolean;
    type: 'influencer' | 'normal';
    likes?: Like [];
    favorites?: Favorite [];
    reviews?: Review [];
    ratings?: Rating [];
    createdAt: string;
}

// export interface Influencer extends User {
//     // type: string;
//     firstName: string;
//     lastName: string;
//     name: string;
//     cover: string;
//     longitude: string;
//     latitude: string;
//     accounts: Account [];
// }

export interface Normal extends User {
    // type: string;
    name: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    settings: {
        languages: Language [],
        activeLanguages: Language [],
    },
    // auth: {
    //     user: User;
    // };
    links: {
        mainLinks: MenuLink [],
        socialLinks: MenuLink [],
        contactLinks: MenuLink [],
        footerLinks: MenuLink [],
    },

    packages: TripProps [],

    logo: string;

    lang: string;

    csrf_token: string;
};
