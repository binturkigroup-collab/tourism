import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { Bed, Building2, MapPin, Maximize, Landmark } from "lucide-react";
import PropertyProps from "@/Interfaces/Site/PropertyProps";
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import {useTranslation} from "react-i18next";
import {Link, usePage} from "@inertiajs/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/Pages/Site/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const PropertiesSlider: React.FC<{properties: PropertyProps []}> = ({properties}) => {
    const blockService = Container.get(BlockService);
    const {lang} = usePage().props;
    const {t} = useTranslation();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('featured-properties')}
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
                      delay: 4000,
                      stopOnInteraction: false,
                      stopOnMouseEnter: true,
                  }),
              ]}
              className="w-full"
          >
              <CarouselContent className="-ml-4">
                  {properties.map((property, idx) => (
                      <CarouselItem
                          key={`${property.title}-${idx}`}
                          className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                      >
                          <Card className="bg-card border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 overflow-hidden h-full">
                              <Link href={`/${lang}/properties/${property.slug}`}>
                                  <div className="relative h-48 overflow-hidden">
                                      <img
                                          src={blockService.getImageUrl(property.images[0].url)}
                                          alt={property.title}
                                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                      />
                                      <Badge className="absolute top-4 right-4 bg-secondary text-primary-foreground">
                                          {property.status}
                                      </Badge>
                                  </div>
                                  <div className="p-6">
                                      <h3 className="text-xl font-bold text-secondary mb-2">{property.title}</h3>
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                                          <Landmark className="w-4 h-4 text-secondary" />
                                          <span>{property.developerName}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                                          <Building2 className="w-4 h-4 text-secondary" />
                                          <span>{property.communityName}</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                                          <MapPin className="w-4 h-4 text-secondary" />
                                          <span>{property.cityName}</span>
                                      </div>
                                      <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center gap-3">
                                              {property.numberOfBeds > 0 && (
                                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                      <Bed className="w-4 h-4 text-secondary" />
                                                      <span>{property.numberOfBeds}</span>
                                                  </div>
                                              )}
                                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                  <Maximize className="w-4 h-4 text-secondary" />
                                                  <span>{property.area} sqft</span>
                                              </div>
                                          </div>
                                          <span className="text-lg font-bold text-accent">AED {property.price}</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground">by {property.developerName}</p>
                                  </div>
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
