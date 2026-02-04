import styles from "./styles.module.scss";
import React from "react";
import HeaderProps from "@/Interfaces/Site/HeaderProps";
import {
    AppBar, Box, Typography, Toolbar, IconButton, Drawer,
    List, ListItem, ListItemButton, ListItemText,
    Grid, Container, Stack, Divider, styled,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SocialIcon from "@/Components/Site/SocialIcon/SocialIcon";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import {Link, usePage} from "@inertiajs/react";
import LogoImg from "@/StyledComponents/LogoImg";
import LanguageMenu from "@/Components/Site/LanguageMenu/LanguageMenu";
import {useAppSelector} from "@/Redux/Store/hook";
import Icon from "@/Components/Icon/Icon";
import SiteSearch from "@/Components/Search/SiteSearch";
import LogoSection from "@/Components/Site/LogoSection/LogoSection";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import AnchorTag from "@/Components/AnchorTag/AnchorTag";
import FileService from "@/Services/FileService/FileService";

// THIS COMPONENT FOR MOBILE DEVICES ONLY.
const NavDrawer: React.FC = () => {
    const dark = useAppSelector(state => state.siteTheme.dark);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {lang} = usePage().props
    const {mainLinks, contactLinks, socialLinks} = usePage().props.links;
    const languages = usePage().props.settings.activeLanguages

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    return (
        <Box sx={{display: 'flex'}}>
            <AppBar component="nav" className={styles.navbarBgColor}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <LogoSection />

                    {/*<LanguageMenu languages={languages}></LanguageMenu>*/}
                    {/*<SiteSearch />*/}
                    <IconButton
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{bgcolor: '#FFF'}}
                    >
                        <MenuIcon sx={{color: "FFF"}}/>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box component="nav" dir={document.dir}>
                <Drawer
                    anchor={lang === 'ar' ? 'left' : 'right'}
                    dir={document.dir}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Toolbar component="nav" sx={{justifyContent: 'space-between'}} >
                        <Link href={route('home')}>
                            <LogoImg src={FileService.LOGO}/>
                        </Link>
                        <IconButton
                            onClick={handleDrawerToggle}
                        >
                            <ClearOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <Box className="px-[8px]">
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            // spacing={2}
                            dir={document.dir}
                        >
                            <LanguageMenu languages={languages} displayText={false}></LanguageMenu>
                            {/*<SiteSearch />*/}
                            {/*{*/}
                            {/*    dark ?*/}
                            {/*        <IconButton onClick={handleTheme}>*/}
                            {/*            <Icon name="light-mode"></Icon>*/}
                            {/*            /!*<CiLight color={styles.iconColor}/>*!/*/}
                            {/*        </IconButton>*/}
                            {/*        :*/}
                            {/*        <IconButton onClick={handleTheme}>*/}
                            {/*            <Icon name="dark-mode"></Icon>*/}
                            {/*            /!*<MdDarkMode color={styles.iconColor}/>*!/*/}
                            {/*        </IconButton>*/}
                            {/*}*/}
                        </Stack>
                    </Box>
                    <Divider />
                    {/*Main Menu*/}
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justifyContent="start"
                        alignItems="start"
                    >
                        {mainLinks.map((link, index) => (
                            <Grid columns={{xs: 6}} key={index}>
                                {link.children.length <= 0 && (
                                    <AnchorTag link={link.url} linkType={link.type}>
                                        <ListItemButton>
                                            <ListItemText sx={{textAlign: 'start', fontWeight: 600}}>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase',
                                                    fontSize: '0.75rem'
                                                }}>
                                                    {link.name}
                                                </Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                    </AnchorTag>
                                    // <Box>
                                    //     <a href={link.url}>
                                    //         <ListItemButton>
                                    //             <ListItemText sx={{textAlign: 'start', fontWeight: 600}}>
                                    //                 <Typography sx={{
                                    //                     fontWeight: 700,
                                    //                     textTransform: 'uppercase',
                                    //                     fontSize: '0.75rem'
                                    //                 }}>
                                    //                     {link.name}
                                    //                 </Typography>
                                    //             </ListItemText>
                                    //         </ListItemButton>
                                    //     </a>
                                    //     <Divider variant="middle"></Divider>
                                    // </Box>

                                )}

                                {
                                    link.children.length > 0 && (
                                        <Box>
                                            <ListItemButton>
                                                <ListItemText sx={{textAlign: 'start', fontWeight: 600}}>
                                                    <Typography sx={{
                                                        fontWeight: 700,
                                                        textTransform: 'uppercase',
                                                        fontSize: '0.75rem'
                                                    }}>
                                                        {link.name}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                            <Divider variant="inset"></Divider>
                                            <List dense={true}>
                                                {
                                                    link.children.map((child, key) => (
                                                        <ListItem key={key}>
                                                            <Link href={`/${lang}${child.url}`}>
                                                                <ListItemButton>
                                                                    <ListItemText
                                                                        className="text-start"
                                                                        primary={child.name} />
                                                                </ListItemButton>
                                                            </Link>
                                                        </ListItem>
                                                    ))
                                                }
                                            </List>
                                        </Box>
                                    )
                                }
                            </Grid>
                        ))}
                    </Grid>


                    {/*Social Menu*/}
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        useFlexGap
                        flexWrap="wrap"
                    >


                        {contactLinks.map((link, index) =>(
                            <a className="hover:text-gray-400 text-gray-500 px-3 py-4
                                            lg:py-2 flex items-center text-xs uppercase font-bold"
                               key={index}
                               href={link.url}
                                // target={link.target}
                            >
                                <div className="flex items-center gap-1">
                                    <SocialIcon name={link.image}></SocialIcon>
                                    <div dir="ltr">{link.url.split(':')[1]}</div>
                                </div>
                            </a>
                        ))}
                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        useFlexGap
                        flexWrap="wrap"
                    >
                        {socialLinks.map((link, index) =>(
                            <a className="hover:text-gray-400 text-gray-500 px-3 py-4
                                            lg:py-2 flex items-center text-xs uppercase font-bold"
                               key={index}
                               href={link.url}
                               target={link.target}>
                                <SocialIcon name={link.image}></SocialIcon>
                            </a>
                        ))}
                    </Stack>

                </Drawer>
            </Box>
        </Box>
    );
}

export default NavDrawer;
