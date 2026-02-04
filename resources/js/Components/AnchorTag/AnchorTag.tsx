import React, {PropsWithChildren} from 'react';
import MainMenuTypesEnum from "@/Enums/MainMenuTypesEnum";
import {Box} from "@mui/material";
import {Link, usePage} from "@inertiajs/react";

type AnchorProps = {
    link: string;
    linkType: string;
}

const AnchorTag: React.FC<PropsWithChildren<AnchorProps>> =
    ({children, link, linkType}) => {
    const lang = usePage().props.lang;
    return (
        <Box>
            {
                linkType === 'File' ?
                    <a href={'/' + link} download={link} target="_blank">{children}</a>
                    :
                    <Link href={`/${lang}${link}`}>{children}</Link>
            }
        </Box>

    );
};

export default AnchorTag;
