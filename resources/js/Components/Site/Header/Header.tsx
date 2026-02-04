import React from "react";
import {usePage} from "@inertiajs/react";
import {Link} from "@inertiajs/react";
import {Button} from "@/Pages/Site/components/ui/button";
import BlockService from "@/Services/BlockService/BlockService";
import {Container} from "typedi";
import "reflect-metadata";
import LogoSection from "@/Components/Site/LogoSection/LogoSection";
import {Menu, X} from "lucide-react";
import LanguageMenu from "@/Components/Site/LanguageMenu/LanguageMenu";
import {useTranslation} from "react-i18next";
const Header:React.FC = () =>
{
    // const dispatch = useAppDispatch();
    // const dark = useAppSelector(state => state.siteTheme.dark);

    // const handleTheme = () => {
    //     dark ? dispatch(setSiteMode(false)) : dispatch(setSiteMode(true));
    // }
    const lang = usePage().props.lang;
    const {mainLinks, contactLinks, socialLinks} = usePage().props.links;
    const languages = usePage().props.settings.activeLanguages
    const [isOpen, setIsOpen] = React.useState(false);
    const blockService = Container.get(BlockService);
    const {t} = useTranslation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
              {/*      <Link href="/" className="flex items-center gap-3">*/}
              {/*          <img src={blockService.getImageUrl()} alt="Bin Turki" className="h-14 w-auto"/>*/}
              {/*          <div className="flex flex-col">*/}
              {/*<span className="font-heading font-bold text-lg text-foreground leading-tight">*/}
              {/*  Bin Turki*/}
              {/*</span>*/}
              {/*              <span className="text-xs text-muted-foreground tracking-wider uppercase">*/}
              {/*  Tourism Group*/}
              {/*</span>*/}
              {/*          </div>*/}
              {/*      </Link>*/}

                    <LogoSection />

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {mainLinks.map((link, index) => (
                            <Link
                                key={`${crypto.randomUUID()}-${index}`}
                                href={`/${lang}${link.url}`}
                                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href={`/${lang}/contact`}>
                            <Button variant="hero" size="lg">
                                {t('book')}
                            </Button>
                        </Link>

                        <LanguageMenu languages={languages} />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-foreground"/>
                        ) : (
                            <Menu className="w-6 h-6 text-foreground"/>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden pb-6 animate-fade-in">
                        <div className="flex flex-col gap-4">
                            {mainLinks.map((link, index) => (
                                <Link
                                    key={`${crypto.randomUUID()}-${index}`}
                                    href={`/${lang}${link.url}`}
                                    className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <LanguageMenu languages={languages}></LanguageMenu>
                            <Link href={`/${lang}/contact`}>
                                <Button variant="hero" size="lg" className="mt-4">
                                    {t('book')}
                                </Button>
                            </Link>



                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;
