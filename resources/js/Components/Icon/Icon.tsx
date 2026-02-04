import React from "react";
import styles from "./styles.module.scss";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaSignInAlt,
    FaProductHunt, FaSnapchatGhost
} from "react-icons/fa";
import {
    FaMobileScreen,
} from "react-icons/fa6";
import {
    GrMail,
} from "react-icons/gr";
import {
    AiFillHome,
    AiOutlineLogin,
    AiOutlineLogout,
    AiFillYoutube,
} from "react-icons/ai";
import {
    HiUserGroup,
} from "react-icons/hi";
import {
    IoIosNotifications,
} from "react-icons/io";
import {
    SiGnuprivacyguard
} from "react-icons/si";
import {
    MdLoyalty,
} from "react-icons/md";

import {
    BiLogoTiktok,
    BiSolidCoupon,
} from "react-icons/bi";

import { RiTwitterXLine } from "react-icons/ri";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconContext } from "react-icons";

import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import EditIcon from '@mui/icons-material/Edit';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import WebIcon from '@mui/icons-material/Web';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import BusinessIcon from '@mui/icons-material/Business';
import ListIcon from '@mui/icons-material/List';
import LinkIcon from '@mui/icons-material/Link';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FaxIcon from '@mui/icons-material/Fax';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GitHubIcon from '@mui/icons-material/GitHub';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import OpacityIcon from '@mui/icons-material/Opacity';

interface IconProps{
    name: string;
    color?: string;
    size?: number;
    sizeSmall?: number;
}

import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import {Collections, Info, LocalGroceryStore, LocalOffer, SpeakerGroup} from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Link} from "@inertiajs/react";
import {IconBaseProps} from "react-icons/lib/cjs/iconBase";
import CloseIcon from "@mui/icons-material/Close";
import {Github, Linkedin, Mail, Smartphone} from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
const Icon: React.FC<IconProps> = ({name, color = '', size = 36, sizeSmall = 24}) => {
    // const size = 36;
    // const sizeSmall = 24;
    switch (name.toLowerCase()) {
        case 'facebook':
            return (
                <IconContext.Provider value={{ className: styles.facebookColor }}>
                    <FaFacebook size={sizeSmall}></FaFacebook>
                </IconContext.Provider>

            );
        case 'instagram':
            return (
                <IconContext.Provider value={{ className: styles.instagramColor }}>
                    <FaInstagram size={sizeSmall}></FaInstagram>
                </IconContext.Provider>
            );
        case 'linkedin':
            return (
                <IconContext.Provider value={{ className: styles.linkedinColor }}>
                    <FaLinkedinIn size={sizeSmall}></FaLinkedinIn>
                </IconContext.Provider>
            );
        case 'linkedin2':
            return (
                <Linkedin className="h-5 w-5" />
            );
        case 'twitter':
            return (
                <IconContext.Provider value={{ className: styles.twitterColor }}>
                    <FaTwitter size={sizeSmall}></FaTwitter>
                </IconContext.Provider>

            );

        case 'x':
            return (
                <IconContext.Provider value={{ className: styles.twitterColor }}>
                    <BsTwitterX size={sizeSmall}></BsTwitterX>
                </IconContext.Provider>
            );

        case 'youtube' :
            return (
                <IconContext.Provider value={{ className: styles.youtubeColor }}>
                    <AiFillYoutube size={sizeSmall}></AiFillYoutube>
                </IconContext.Provider>

            );

        case 'tiktok' :
            return (
                <IconContext.Provider value={{ className: styles.tiktokColor }}>
                    <BiLogoTiktok size={sizeSmall}></BiLogoTiktok>
                </IconContext.Provider>

            );
        case 'snapchat':
            return (
                <FaSnapchatGhost size={20}></FaSnapchatGhost>
            );

        case 'whatsapp':
            return (
                <WhatsAppIcon></WhatsAppIcon>
            );

        case 'github':
            return (
                <GitHubIcon></GitHubIcon>
            );

        case 'github2':
            return (
                <Github className="h-5 w-5" />
            );

        case 'phone':
            return (
                <FaMobileScreen></FaMobileScreen>
            );

        case 'phone2':
            return (
                <Smartphone className="h-5 w-5"/>
            );

        case 'local-phone':
            return (
                <LocalPhoneIcon ></LocalPhoneIcon>
            );

        case 'mail-mui':
            return (
                <EmailIcon></EmailIcon>
            );

        case 'mail2':
            return (
                <Mail className="h-5 w-5" />
            );

        case 'fax':
            return (
                <FaxIcon></FaxIcon>
            );

        case 'post-office':
            return (
                <LocalPostOfficeIcon></LocalPostOfficeIcon>
            );

        case 'mail':
            return (
                <GrMail size={size}></GrMail>
            );
        case 'home':
            return (
                <AiFillHome size={sizeSmall}></AiFillHome>
            );
        case 'group':
            return (
                <HiUserGroup size={size}></HiUserGroup>
            );
        case 'login':
            return (
                // <FaSignInAlt size={sizeSmall}></FaSignInAlt>
                <LoginIcon />

            );
        case 'register':
            return (
                // <SiGnuprivacyguard size={sizeSmall}></SiGnuprivacyguard>
                <HowToRegIcon />
            );

        case 'notification-mui':
            return (
                <NotificationsIcon></NotificationsIcon>
            );
        case 'notifications':
            return (
                <IoIosNotifications size={sizeSmall}></IoIosNotifications>
            );
        case 'logout':
            return (
                <LogoutIcon />
            );
        case 'account':
            return (
                <AccountCircleIcon sx={{ fontSize: size }}/>
            );

        case 'inbox':
            return (
                <InboxIcon></InboxIcon>
            );

        case 'draft':
            return (
                <DraftsIcon></DraftsIcon>
            );

        case 'send':
            return (
                <SendIcon></SendIcon>
            );

        case 'expand-less':
            return (
                <ExpandLess></ExpandLess>
            );

        case 'expand-more':
            return (
                <ExpandMore sx={{fontSize:size}}></ExpandMore>
            );

        case 'star':
            return (
                <StarBorder></StarBorder>
            );

        case 'forward':
            return (
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
            );
        case 'category':
            return (
                <CategoryIcon></CategoryIcon>
            );

        case 'customer':
            return (
                <PersonIcon></PersonIcon>
            );

        case 'product':
            return (
                <GppGoodIcon></GppGoodIcon>
            );

        case 'order':
            return (
                <LocalGroceryStore></LocalGroceryStore>
            );

        case 'settings':
            return (
                <SettingsIcon></SettingsIcon>
            );

        case 'marketing':
            return (
                <ListAltIcon></ListAltIcon>
            );

        case 'offer':
            return (
                <LocalOffer></LocalOffer>
            );
        case 'coupon':
            return (
                <BiSolidCoupon></BiSolidCoupon>
            );
        case 'loyalty':
            return (
                <MdLoyalty></MdLoyalty>
            );

        case 'language':
            return (
                <LanguageIcon></LanguageIcon>
            );

        case 'revenue':
            return (
                <MonetizationOnIcon></MonetizationOnIcon>
            );

        case 'light-mode':
            return (
                <LightModeIcon></LightModeIcon>
            );

        case 'dark-mode':
            return (
                <DarkModeIcon></DarkModeIcon>
            );

        case 'edit':
            return (
                <EditIcon color="secondary" ></EditIcon>
            );

        case 'delete':
            return (
                <DeleteRoundedIcon color="error"></DeleteRoundedIcon>
            );

        case 'vertical-dots':
            return (
                <MoreVertIcon></MoreVertIcon>
            );

        case 'website':
            return (
                <WebIcon></WebIcon>
            );

        case 'main-section':
            return (
                <SlideshowIcon></SlideshowIcon>
            );

        case 'services':
            return (
                <DesignServicesIcon></DesignServicesIcon>
            );

        case 'clients':
            return (
                <BusinessIcon></BusinessIcon>
            );

        case 'gallery':
            return (
                <Collections></Collections>
            );

        case 'about-us':
            return (
                <Info></Info>
            );

        case 'mission':
            return (
                <SpeakerGroup></SpeakerGroup>
            );

        case 'main-menu':
            return (
                <ListIcon></ListIcon>
            );

        case 'social-menu':
            return (
                <ConnectWithoutContactIcon></ConnectWithoutContactIcon>
            );

        case 'contact-menu':
            return (
                <ContactsIcon></ContactsIcon>
            );

        case 'footer-menu':
            return (
                <LinkIcon></LinkIcon>
            );

        case 'burger-menu':
            return (
                <MenuIcon></MenuIcon>
            );

        case 'close':
            return (
                <CloseIcon></CloseIcon>
            );

        case 'play':
            return (
                <PlayCircleIcon></PlayCircleIcon>
            );

        case 'stop':
            return(
                <StopCircleIcon></StopCircleIcon>
            );

        case 'zoom-in':
            return (
                <ZoomInIcon></ZoomInIcon>
            );

        case 'zoom-out':
            return (
                <ZoomOutIcon></ZoomOutIcon>
            );

        case 'map-in':
            return (
                <ZoomInMapIcon></ZoomInMapIcon>
            );

        case 'map-out':
            return (
                <ZoomOutMapIcon></ZoomOutMapIcon>
            );

        case 'left' :
            return (
                <KeyboardArrowLeftIcon></KeyboardArrowLeftIcon>
            );

        case 'double-left' :
            return (
                <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
            );

        case 'right' :
            return (
                <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
            );

        case 'double-right' :
            return (
                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
            );

        case 'shopping-cart' :
            return (
                <ShoppingCartIcon></ShoppingCartIcon>
            );

        case 'trip' :
            return (
                <TripOriginIcon></TripOriginIcon>
            );

        case 'tourism' :
            return (
                <ModeOfTravelIcon></ModeOfTravelIcon>
            );

        case 'appointment' :
            return (
                <BookOnlineIcon></BookOnlineIcon>
            );

        case 'city':
            return (
                <OpacityIcon></OpacityIcon>
            );

        default:
            return null;
    }
}

export default Icon;
