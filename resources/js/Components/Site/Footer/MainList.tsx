import React from 'react';
import {ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import MenuLink from "@/models/Link/MenuLink";
import AnchorTag from "@/Components/AnchorTag/AnchorTag";

const MainList: React.FC<{links: MenuLink []}> = ({links}) => {
    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems={{xs: 'center', md: "flex-start"}}
        >
            {
                links.map((link, key) =>
                    <AnchorTag link={link.url} linkType={link.type} key={key}>
                        <ListItemButton>
                            <ListItemText sx={{fontWeight: 600}}>
                                <Typography sx={{
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    fontSize: '0.75rem'
                                }}>
                                    {link.name}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </AnchorTag>
                )
            }
        </Stack>
    );
};

export default MainList;
