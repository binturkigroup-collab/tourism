import React from 'react';
import {Button} from "@/Pages/Site/components/ui/button";
import {Github, Linkedin, Mail, Smartphone} from "lucide-react";
import MenuLink from "@/models/Link/MenuLink";
import {Link} from "@inertiajs/react";

const CustomLinks: React.FC<{socialLinks: MenuLink [], contactLinks: MenuLink []}> = ({socialLinks, contactLinks}) => {

    const github = socialLinks.find(item => item.name.toLowerCase() === "github");
    const linkedin = socialLinks.find(item => item.name.toLowerCase() === "linkedin");
    const mail = contactLinks.find(item => item.name.toLowerCase() === "email");
    const phone = contactLinks.find(item => item.name.toLowerCase() === "mobile");
    console.log(contactLinks);

    return (
        <div className="flex gap-4">
            {github && <a href={github?.url ?? "#"} target={github?.target}>
                <Button variant="ghost" size="icon" className="hover:text-accent transition-colors link">
                    <Github/>
                </Button>
            </a>}

            <a href={linkedin?.url} target={linkedin?.target}>
                <Button variant="ghost" size="icon" className="hover:text-accent transition-colors link">
                    <Linkedin className="h-5 w-5"/>
                </Button>
            </a>

            <a href={mail?.url} target={mail?.target}>
                <Button variant="ghost" size="icon" className="hover:text-accent transition-colors link">
                    <Mail className="h-5 w-5"/>
                </Button>
            </a>

            <a href={phone?.url} target={phone?.target}>
                <Button variant="ghost" size="icon" className="hover:text-accent transition-colors link">
                    <Smartphone className="h-5 w-5"/>
                </Button>
            </a>
        </div>
    );
};

export default CustomLinks;
