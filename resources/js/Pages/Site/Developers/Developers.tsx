import React from 'react';
import {Head, usePage} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import BlockProps from "@/Interfaces/Site/BlockProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import ImageLayout from "@/Components/images/ImageLayout";
import {useTranslation} from "react-i18next";
import SEO from "@/Pages/Site/components/SEO";
import DeveloperProps from "@/Interfaces/Site/DeveloperProps";
import {Link} from "@inertiajs/react";

const Developers: React.FC<{developers: DeveloperProps []}> = ({developers}) => {
    // const randomizeNumber = () => {
    //     return Math.floor(Math.random() * 100);
    // }

    const {t} = useTranslation();
    const {lang} = usePage().props;
    return (
        <HeaderLayout>
            <Head title={'Developers'}>
                {/*<SEO*/}
                {/*    title="Featured Developers"*/}
                {/*    description="Explore our portfolio of prestigious real estate developers including Emaar, Damac, Nakheel, Azizi, and more luxury property developers in Dubai and UAE."*/}
                {/*    canonical="https://prestigepropertydxb.com/en/developers"*/}
                {/*/>*/}
            </Head>
            <div className="min-h-screen bg-backround">
                {/*<header className="border-b border-border">*/}
                {/*    <div className="container mx-auto px-4 py-6">*/}
                {/*        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">*/}
                {/*            Our Developers*/}
                {/*        </h1>*/}
                {/*        <p className="text-muted-foreground max-w-2xl">*/}
                {/*            Explore our portfolio of premium developers and their exclusive projects*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</header>*/}

                <section className="pt-16 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--secondary)/0.15),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--secondary)/0.1),transparent_50%)]" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
                                {t('featured-developers')}
                            </h1>
                            <p className="text-xl text-primary-foreground/80 leading-relaxed">
                                {t('dev-hero')}
                            </p>
                        </div>
                    </div>
                </section>

                <main className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {developers.map((developer) => (
                            <Card
                                key={developer.title}
                                className="group bg-white border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 cursor-pointer"
                            >
                                <Link href={`/${lang}/developers/${developer.slug}`}>
                                    <CardHeader>
                                        <div className="h-32 flex items-center justify-center mb-4">
                                            {/*<img*/}
                                            {/*    src={developer.logo}*/}
                                            {/*    alt={developer.title}*/}
                                            {/*    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"*/}
                                            {/*/>*/}
                                            <ImageLayout
                                                src={`/file/blocks/${developer.images[0].url}`}
                                                alt={developer.title}
                                                classes="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                                            ></ImageLayout>
                                        </div>
                                        <CardTitle className="text-center text-muted">
                                            {developer.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <div className="inline-flex items-center justify-center bg-secondary/10 text-secondary rounded-full px-4 py-2">
                                            {/*Projects Number*/}
                                            <span className="text-2xl font-bold">{developer.numberOfProjects}</span>
                                            <span className="ml-2 text-sm">{developer.numberOfProjects === 1 ? "Project" : "Projects"}</span>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </HeaderLayout>
    );
};

export default Developers;
