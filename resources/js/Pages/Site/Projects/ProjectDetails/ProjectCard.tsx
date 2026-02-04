import React from 'react';
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import {Link, usePage} from "@inertiajs/react";
import {Badge} from "@/Pages/Site/components/ui/badge";
import ProjectStatusEnum from "@/Enums/ProjectStatusEnum";
import {Card, CardContent, CardHeader, CardTitle} from "@/Pages/Site/components/ui/card";
import {Building2, Calendar, Landmark, MapPin} from "lucide-react";
import {Container} from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";

const ProjectCard: React.FC<{project: ProjectProps}> = ({project}) => {
    const {lang} = usePage().props;
    const blockService = Container.get(BlockService);
    return (
        <Card
            className="group hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 cursor-pointer overflow-hidden"
        >
            <Link href={`/${lang}/projects/${project.slug}`}>
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={blockService.getImageUrl(project.images[0].url)}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-secondary text-primary-foreground">
                        {ProjectStatusEnum[project.status]}
                    </Badge>
                </div>
                <CardHeader>
                    <CardTitle className="text-foreground">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-secondary flex-shrink-0" />
                            <div className="text-sm text-muted-foreground">{project.developerName}</div>
                        </div>
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-muted-foreground">
                                <span className="text-sm text-muted-foreground">{project.communityName} - {project.cityName}</span>
                                {/*<div>{project.cityName}</div>*/}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{project.type}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-secondary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                      Launch: {new Date(project.lunchDate).toLocaleDateString()}
                    </span>
                        </div>

                        <div className="pt-3 border-t border-border">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">{project.type}</span>
                                <span className="text-xl font-bold text-secondary">
                        AED { new Intl.NumberFormat().format(project.lunchPrice)}
                      </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
};

export default ProjectCard;
