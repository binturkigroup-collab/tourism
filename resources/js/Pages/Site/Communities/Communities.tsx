import React from 'react';
import {Head, Link, usePage} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import BlockProps from "@/Interfaces/Site/BlockProps";
import { Card, CardContent } from "@/Pages/Site/components/ui/card";
import { MapPin, Home, ArrowRight } from "lucide-react";
import ImageLayout from "@/Components/images/ImageLayout";
import {useTranslation} from "react-i18next";
import CommunityProps from "@/Interfaces/Site/CommunityProps";

// const ranges = [
//     "AED 800K - 2.5M",
//     "AED 1.5M - 8M",
//     "AED 2M - 12M",
//     "AED 3M - 15M",
//     "AED 1.2M - 50M",
//     "AED 1M - 4.5M",
//     "AED 650K - 2M",
//     "AED 900K - 6M",
//     "AED 1.3M - 10M",
// ];
//
// const features = [
//     ["Family-Friendly", "Parks & Recreation", "Shopping Centers", "Schools Nearby"],
//     ["Waterfront", "Marina Access", "Beach Club", "Luxury Lifestyle"],
//     ["Beachfront", "Retail District", "Dining Options", "Water Sports"],
//     ["Villas Only", "Central Park", "Gated Community", "Premium Location"],
//     ["Iconic Location", "Burj Khalifa Views", "The Dubai Mall", "Fine Dining"],
//     ["Lagoon Living", "Eco-Friendly", "Water Activities", "Modern Design"],
//     ["Affordable", "Community Parks", "Retail Centers", "Schools & Healthcare"],
//     ["Island Living", "Beach Access", "Resort Lifestyle", "Investment Opportunity"],
//     ["Racecourse Views", "Crystal Lagoon", "Sports District", "Entertainment Hub"]
// ];
const Communities: React.FC<{communities: CommunityProps []}> = ({communities}) => {
    const {t} = useTranslation();
    const {lang} = usePage().props;
    return (
        <HeaderLayout>
            <Head title={'Communities'}>
            </Head>
            <div className="min-h-screen bg-background">
                {/*<Navigation />*/}

                {/* Page Header */}
                <section className="pt-16 pb-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--secondary)/0.15),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--secondary)/0.1),transparent_50%)]" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full text-secondary text-sm font-medium mb-6">
              {t('exp-loc')}
            </span>
                            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
                                {t('dubai-prem-comm')}
                            </h1>
                            <p className="text-xl text-primary-foreground/80 leading-relaxed">
                                {t('comm-hero')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Communities Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {communities.map((community, index) => (
                                <Link key={community.id} href={`/${lang}/properties?communitySlug=${community.slug}`}>
                                    <Card className="group bg-white overflow-hidden border-border hover:border-secondary transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 h-full">
                                        <CardContent className="p-0">
                                            <div className="relative aspect-[4/3] overflow-hidden">
                                                {/*<img*/}
                                                {/*    src={community.image}*/}
                                                {/*    alt={community.name}*/}
                                                {/*    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"*/}
                                                {/*/>*/}
                                                <ImageLayout
                                                    src={`/file/blocks/${community.images[0].url}`}
                                                    alt={community.title}
                                                    classes="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                ></ImageLayout>
                                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

                                                <div className="absolute top-4 right-4 px-3 py-1.5 bg-secondary/90 backdrop-blur-sm rounded-full">
                                                    <span className="text-xs font-semibold text-secondary-foreground flex items-center gap-1">
                                                      <Home className="h-3 w-3" />
                                                        {community.numberOfProperties}
                                                    </span>
                                                </div>

                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MapPin className="h-4 w-4 text-secondary" />
                                                        <span className="text-secondary text-sm font-medium">Dubai, UAE</span>
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                                                        {community.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                                    {community.description}
                                                </p>

                          {/*                      <div className="flex flex-wrap gap-2 mb-4">*/}
                          {/*                          {features[index].slice(0, 3).map((feature, idx) => (*/}
                          {/*                              <span*/}
                          {/*                                  key={idx}*/}
                          {/*                                  className="px-2 py-1 bg-accent rounded text-xs font-medium text-accent-foreground"*/}
                          {/*                              >*/}
                          {/*  {feature}*/}
                          {/*</span>*/}
                          {/*                          ))}*/}
                          {/*                      </div>*/}

                                                <div className="flex items-center justify-between pt-4 border-t border-border">
                        {/*<span className="text-secondary font-semibold text-lg">*/}
                        {/*  {ranges[index]}*/}
                        {/*</span>*/}
                                                    <span className="text-foreground/60 group-hover:text-secondary transition-colors flex items-center gap-1 text-sm font-medium">
                          View Details
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Can't Find What You're Looking For?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Our expert team can help you find the perfect property in any Dubai community
                            </p>
                            <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all hover:shadow-lg">
                                Speak with a Consultant
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </HeaderLayout>
    );
};

export default Communities;
