import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import React, {useEffect} from "react";
import ReactCountryFlag from "react-country-flag";
// import {useCookies} from "react-cookie";
import Language from "@/models/language/Language";
import {usePage} from "@inertiajs/react";
// TO GET THE CODE OF COUNTRY FLAG, JUST VISIT THE SITE:
// https://flagicons.lipis.dev/
// ADD THE CODE TO DB.languages.

interface LanguageMenuProps {
    languages: Language[],
    displayText?: boolean,
}

const LanguageMenu: React.FC<LanguageMenuProps> = ({
                                                       languages,
                                                       displayText = true,
                                                   }) =>
{
    // const [cookies, setCookie] = useCookies(['language']);
    // console.log(sessionStorage.getItem('locale'));
    const {lang} = usePage().props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: any, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        // console.log('document', document.cookie);
        // setCookie('language', document.cookie);
        languages.map((languange, index) => {
            // if (lang.code === cookies.language) setSelectedIndex(index);
            if (languange.code === lang) setSelectedIndex(index);
        })
    }, [document.cookie])

    return (
        <div className='me-auto'>
            <List
                component="nav"
                aria-label="Device settings"
                className="lg:text-white lg:hover:text-gray-300 text-gray-800"
                sx={{padding: '0'}}
                dir={document.dir}
            >
                <a href={`/${languages[(selectedIndex + 1) % 2]?.code}/home`} className="flex items-center">
                    <ListItem
                        // button
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="Language-Aria"
                        aria-expanded={open ? 'true' : undefined}
                        // onClick={handleClickListItem}
                        sx={{padding: '0'}}
                    >
                        <ReactCountryFlag
                            svg
                            className="emojiFlag"
                            countryCode={languages[(selectedIndex + 1) % 2]?.flagCode}
                            style={{
                                fontSize: '2em',
                                lineHeight: '2em',
                            }}
                            aria-label="United States"
                        />
                        {displayText && <ListItemText
                            secondary={languages[(selectedIndex + 1) % 2]?.code.toUpperCase()}
                            secondaryTypographyProps={{sx: {textAlign: 'start', padding: '8px', color: "hsl(160 10% 15%)"}}}
                            sx={{width: '80px'}}
                        />}
                    </ListItem>
                </a>

            </List>
            {/*<Menu*/}
            {/*    id="lock-menu"*/}
            {/*    anchorEl={anchorEl}*/}
            {/*    open={open}*/}
            {/*    onClose={handleClose}*/}
            {/*    MenuListProps={{*/}
            {/*        'aria-labelledby': 'lock-button',*/}
            {/*        role: 'listbox',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    {languages.map((language, index) => (*/}
            {/*        <MenuItem*/}
            {/*            key={language.flagCode}*/}
            {/*            selected={index !== selectedIndex}*/}
            {/*            onClick={(event) => handleMenuItemClick(event, index)}*/}
            {/*        >*/}
            {/*            <a href={`/${language.code}/home`} className="flex items-center">*/}
            {/*                <ListItemIcon>*/}
            {/*                    <ReactCountryFlag*/}
            {/*                        svg*/}
            {/*                        className="emojiFlag"*/}
            {/*                        countryCode={language.flagCode}*/}
            {/*                        style={{*/}
            {/*                            fontSize: '2em',*/}
            {/*                            lineHeight: '2em',*/}
            {/*                        }}*/}
            {/*                        aria-label="United States"*/}
            {/*                    />*/}
            {/*                </ListItemIcon>*/}
            {/*                <ListItemText>*/}
            {/*                    {language.name}*/}
            {/*                </ListItemText>*/}
            {/*            </a>*/}

            {/*        </MenuItem>*/}
            {/*    ))}*/}
            {/*</Menu>*/}
        </div>
    );
}

export default LanguageMenu;
