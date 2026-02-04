import MenuLink from "@/models/Link/MenuLink";
import Language from "@/models/language/Language";

interface HeaderProps {
    // mainLinks: MenuLink[],
    socialLinks: MenuLink[],
    contactLinks: MenuLink[],
    logo: {logo: string},
    languages: Language[],
    handleTheme?: () => void,
    footerLinks: MenuLink [],
}

export default HeaderProps;
