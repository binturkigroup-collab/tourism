import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import { Badge } from "@/Pages/Site/components/ui/badge";
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import BlockService from "@/Services/BlockService/BlockService";
import {Container} from "typedi";
import "reflect-metadata";
import {useTranslation} from "react-i18next";
import {Link, usePage} from "@inertiajs/react";
import ProjectStatusEnum from "@/Enums/ProjectStatusEnum";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/Pages/Site/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ImageLayout from "@/Components/images/ImageLayout";
import {Building2, Home, MapPin} from "lucide-react";
export const ProjectsSlider: React.FC<{projects: ProjectProps []}> = ({projects}) => {
  const {t} = useTranslation();
    const {lang} = usePage().props;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('featured-projects')}
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
                  {projects.map((project, idx) => (
                      <CarouselItem
                          key={`${project.title}-${idx}`}
                          className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                      >
                          <Card className="bg-background border-border hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 overflow-hidden h-full">
                              <Link href={`/${lang}/projects/${project.slug}`}>
                              <div className="relative h-48 overflow-hidden">
                                  <ImageLayout
                                      src={`/file/blocks/${project.images[0].url}`}
                                      alt={project.title}
                                      classes="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                  ></ImageLayout>
                                  <Badge className="absolute top-4 right-4 bg-secondary text-primary-foreground">
                                      {ProjectStatusEnum[project.status]}
                                  </Badge>
                              </div>
                              <div className="p-6">
                                  <h3 className="text-xl font-bold text-primary mb-2">{project.title}</h3>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                                      <Building2 className="w-4 h-4 text-secondary" />
                                      <span>{project.communityName}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                                      <MapPin className="w-4 h-4 text-secondary" />
                                      <span>{project.cityName}</span>
                                  </div>
                                  <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                          <Home className="w-4 h-4 text-secondary" />
                                          <span>{project.type}</span>
                                      </div>
                                      <span className="text-lg font-bold text-secondary">AED {project.lunchPrice}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">by {project.developerName}</p>
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
