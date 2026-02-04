import React, { useEffect, useState } from "react";
import { Card } from "@/Pages/Site/components/ui/card";
import BlockProps from "@/Interfaces/Site/BlockProps";
import ImageLayout from "@/Components/images/ImageLayout";
import {useTranslation} from "react-i18next";
import DeveloperProps from "@/Interfaces/Site/DeveloperProps";
import {Link, usePage} from "@inertiajs/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/Pages/Site/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const DevelopersSlider: React.FC<{developers: DeveloperProps []}> = ({developers}) => {
    const {t} = useTranslation();
    const {lang} = usePage().props;

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t('featured-developers')}
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto"></div>
                </div>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        direction: lang === 'ar' ? 'rtl' : 'ltr',
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {developers.map((developer, idx) => (
                            <CarouselItem
                                key={`${developer.title}-${idx}`}
                                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                            >
                                <Link
                                    href={`/${lang}/developers/${developer.slug}`}
                                    className="relative z-20"
                                >
                                    <Card className="bg-background border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-accent/20">

                                        <div className="p-8 flex items-center justify-center h-32">
                                            <ImageLayout
                                                src={`/file/blocks/${developer.images[0].url}`}
                                                alt={developer.title}
                                                classes="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                                            ></ImageLayout>
                                        </div>
                                    </Card>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};
