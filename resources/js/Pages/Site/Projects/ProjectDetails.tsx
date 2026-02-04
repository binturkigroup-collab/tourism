import React from 'react';
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import {Head} from "@inertiajs/react";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { MapPin } from "lucide-react";
import "reflect-metadata";
import ProjectGallery from "@/Pages/Site/Projects/ProjectDetails/ProjectGallery";
import ProjectInfo from "@/Pages/Site/Projects/ProjectDetails/ProjectInfo";
import LeadSection from "@/Pages/Site/components/LeadSection";
import ProjectStatusEnum from "@/Enums/ProjectStatusEnum";
import ResourceContainer from "@/Providers/ResourceProvider/Components/ResourceContainer";
import BlockProps from "@/Interfaces/Site/BlockProps";

const ProjectDetails: React.FC<{project: ProjectProps, developer: BlockProps}> = ({project, developer}) => {
    return (
        <HeaderLayout>
            <Head title={`${project.title}`}></Head>

            <div className="min-h-screen bg-background">
                <header className="border-b border-border bg-background">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {project.title}
                                </h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4 text-secondary" />
                                    <span>{project.communityName}, {project.cityName}</span>
                                </div>
                            </div>
                            <Badge className="bg-secondary text-primary-foreground text-lg px-4 py-2">
                                {ProjectStatusEnum[project.status]}
                            </Badge>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Gallery and Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Gallery */}
                            <ProjectGallery project={project}></ProjectGallery>

                            {/* Project Details */}
                            <ProjectInfo project={project}></ProjectInfo>

                            {/* Resources */}
                            {/*<ProjectResources project={project}></ProjectResources>*/}
                            {/*<ObjectResources media={project} instanceType={"projects"}></ObjectResources>*/}
                            <ResourceContainer
                                resources={project}
                                leadType={{id: project.projectId, propertyName: project.title, type: "project"}}></ResourceContainer>

                        </div>

                        {/* Right Column - Lead Form */}
                        {/*<ProjectLead project={project}></ProjectLead>*/}
                        <LeadSection leadType={{type: "project" , id: project.projectId, propertyName: project.title}}></LeadSection>
                    </div>
                </main>
            </div>
        </HeaderLayout>
    );
};

export default ProjectDetails;
