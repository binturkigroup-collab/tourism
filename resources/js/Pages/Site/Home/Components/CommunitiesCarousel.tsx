import { Card, CardContent } from "@/Pages/Site/components/ui/card";
import { MapPin, Home } from "lucide-react";
import React, {useEffect, useState} from "react";
import BlockProps from "@/Interfaces/Site/BlockProps";
import ImageLayout from "@/Components/images/ImageLayout";
import {useTranslation} from "react-i18next";
import CommunityProps from "@/Interfaces/Site/CommunityProps";
import {Link, usePage} from "@inertiajs/react";
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem} from "@/Pages/Site/components/ui/carousel";
import {Badge} from "@/Pages/Site/components/ui/badge";
import ProjectStatusEnum from "@/Enums/ProjectStatusEnum";

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
const CommunitiesCarousel: React.FC<{communities: CommunityProps []}> = ({communities}) => {

    const {t} = useTranslation();
    const {lang} = usePage().props;

    return (
      <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                    {t('prem-loc')}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
                      {t('featured-communities')}
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {t('comm-home-hero')}
                  </p>
              </div>

              <Carousel
                  opts={{
                      align: "start",
                      loop: true,
                      direction: lang === 'ar' ? 'rtl' : 'ltr',
                  }}
                  plugins={[
                      Autoplay({
                          delay: 4000,
                          stopOnInteraction: false,
                          stopOnMouseEnter: true,
                      }),
                  ]}
                  className="w-full"
              >
                  <CarouselContent className="-ml-4">
                      {communities.map((community, idx) => (
                          <CarouselItem
                              key={`${community.title}-${idx}`}
                              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                          >
                              <Card className="bg-background border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 overflow-hidden h-full">
                                  <Link href={`/${lang}/properties?communitySlug=${community.slug}`}>
                                      <CardContent className="p-0">
                                          <div className="relative aspect-[4/3] overflow-hidden">
                                              <ImageLayout
                                                  src={`/file/blocks/${community.images[0].url}`}
                                                  alt={community.title}
                                                  classes="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                              ></ImageLayout>
                                              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

                                              <div className="absolute top-4 right-4 px-3 py-1 bg-secondary/90 backdrop-blur-sm rounded-full">
                                          <span className="text-xs font-semibold text-secondary-foreground flex items-center gap-1">
                                            <Home className="h-3 w-3" />
                                              {`${community.numberOfProperties} ${community.numberOfProperties === 1 ? "Property" : "Properties"}`}
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
                                                  <p className="text-primary-foreground/80 text-sm mb-3 line-clamp-2">
                                                      {community.description}
                                                  </p>
                                                  <div className="flex items-center justify-between">
                                                      {/*<span className="text-secondary font-semibold">*/}
                                                      {/*  {ranges[index]}*/}
                                                      {/*</span>*/}
                                                      <span className="text-primary-foreground/80 text-sm group-hover:text-secondary transition-colors">
                                                          View Details →
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </CardContent>
                                  </Link>
                              </Card>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
              </Carousel>
          </div>
      </section>
  );
};

export default CommunitiesCarousel;
