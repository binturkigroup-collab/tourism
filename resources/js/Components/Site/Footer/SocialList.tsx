import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import SocialIcon from "@/Components/Site/SocialIcon/SocialIcon";
import {Stack} from "@mui/material";
import MenuLink from "@/models/Link/MenuLink";

const SocialList: React.FC<{links: MenuLink [], displayName?: boolean}> = ({links, displayName = false}) => {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="end"
            flexWrap="wrap"
            className="py-[20px] px-[8px]"
        >
            {links.map((link, index) =>(
                <a className="hover:text-gray-300 text-white text-xs uppercase font-bold mx-4"
                   key={index}
                   href={link.url}
                   target={link.target}
                   rel="noopener"
                >
                    {/*<SocialIcon name={link.image}></SocialIcon>*/}
                    <div className="flex items-center p-[8px] gap-1">
                        <SocialIcon name={link.image}></SocialIcon>
                        {displayName && <div dir="ltr">{link.url.split(':')[1]}</div>}
                    </div>
                </a>
            ))}
        </Stack>
    );
};

export default SocialList;
