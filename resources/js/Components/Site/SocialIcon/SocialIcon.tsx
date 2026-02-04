import {FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube, FaSnapchatGhost, FaTiktok} from "react-icons/fa";
import {FaMobileScreen, FaWhatsapp } from "react-icons/fa6";
import {GrMail} from "react-icons/gr";
import React from "react";
import {IconContext} from "react-icons";
import styles from "@/Components/Icon/styles.module.scss";
import {BsTwitterX} from "react-icons/bs";

interface SocialIconProps {
    name: string;
}


const SocialIcon:React.FC<SocialIconProps> = ({name}) => {
    switch (name.toLowerCase()) {
        case 'facebook':
            return (
                <FaFacebook size={20}></FaFacebook>
            );
        case 'instagram':
            return (
                <FaInstagram size={20}></FaInstagram>
            );
        case 'linkedin':
            return (
                <FaLinkedinIn size={20}></FaLinkedinIn>
            );
        case 'twitter':
            return (
                <FaTwitter size={20}></FaTwitter>
            );
        case 'phone':
            return (
                <FaMobileScreen size={20}></FaMobileScreen>
            // <FaWhatsapp size={20}></FaWhatsapp>
            );
        case 'mail':
            return (
                <GrMail size={20}></GrMail>
            );
        case 'whatsapp':
            return (
                <FaWhatsapp size={20}></FaWhatsapp>

            );
        case 'youtube':
            return (
                <FaYoutube size={20}></FaYoutube>
            );
        case 'snapchat':
            return (
                <FaSnapchatGhost size={20}></FaSnapchatGhost>
            );
        case 'tiktok':
            return (
                <FaTiktok size={20}></FaTiktok>
            );

        case 'x':
            return (
                <BsTwitterX size={20}></BsTwitterX>
            );
        default:
            return null;
    }
}

export default SocialIcon;
