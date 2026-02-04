import MenuLink from "@/models/Link/MenuLink";
import Language from "@/models/language/Language";

interface LinkListProps {
    // mainLinks: MenuLink [],
    socialLinks: MenuLink [],
    footerLinks: MenuLink [],
    contactLinks: MenuLink[],
    logo: {logo: string},
    languages: Language [],
}

export default LinkListProps;
