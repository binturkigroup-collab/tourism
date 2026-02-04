import React from 'react';
import {useTranslation} from "react-i18next";

const HeroSection = () => {
    const {t} = useTranslation();
    return (
        <div className="h-min-screen">
            {/*<section className="py-20 bg-primary text-primary-foreground">*/}
            {/*    <div className="container mx-auto px-4 text-center">*/}
            {/*        <h1 className="text-5xl font-bold mb-6">*/}
            {/*            Crafting premium properties and landmark developments that elevate modern lifestyles.*/}
            {/*        </h1>*/}
            {/*        <p className="text-xl max-w-3xl mx-auto leading-relaxed">*/}
            {/*            /!*{t('about-us')}*!/*/}
            {/*            From high-end residences to iconic commercial spaces, we deliver projects that blend luxury, innovation, and lasting value.*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <section className="pt-16 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--secondary)/0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--secondary)/0.1),transparent_50%)]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
                            {t('about-us-title')}
                        </h1>
                        <p className="text-xl text-primary-foreground/80 leading-relaxed">
                            {t('about-us-hero')}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
