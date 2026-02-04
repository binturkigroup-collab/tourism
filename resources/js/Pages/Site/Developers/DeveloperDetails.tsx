import React from 'react';
import BlockProps from "@/Interfaces/Site/BlockProps";
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import {Head} from "@inertiajs/react";
import ImageLayout from "@/Components/images/ImageLayout";
import {useTranslation} from "react-i18next";
import ProjectCard from "@/Pages/Site/Projects/ProjectDetails/ProjectCard";
import LeadSection from "@/Pages/Site/components/LeadSection";
import WhatsAppButton from "@/Pages/Site/components/WhatsAppButton";

const DeveloperDetails: React.FC<{developer: BlockProps, projects: ProjectProps []}> = ({developer, projects}) => {
    console.log('developer: ', developer);
    console.log('projects: ', projects);
    const {t} = useTranslation();
    return (
        <HeaderLayout>
            <Head title={'Developers'} />
            <div className="container p-10">
                <div className="w-[128px] h-[128px] relative">
                    <ImageLayout
                        src={`/file/blocks/${developer.images[0].url}`}
                        alt={developer.title}
                        classes=" absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2
                        max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    ></ImageLayout>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Gallery and Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-secondary text-5xl text-center font-bold">{`${t('about')} ${developer.title}`}</h2>
                        <div className="h-10"></div>
                        <div
                            className="text-primary/80 leading-loose"
                            dangerouslySetInnerHTML={{__html: developer.description}}
                        ></div>

                        <div className="flex justify-start items-center">
                            <h3 className="text-primary text-center text-2xl font-semibold me-6">{t('ask-consult')}</h3>
                            <div className="m-auto">
                                <WhatsAppButton />
                            </div>
                        </div>



                    </div>
                    <LeadSection leadType={{type: "developer" , id: developer.id, propertyName: developer.title}}></LeadSection>
                </div>

                <div className="h-10"></div>

                {projects.length > 0 && <div className="lg:p-16">
                    <h2 className="text-secondary text-5xl text-center font-bold">{t('related-projects', {developer: developer.title})}</h2>
                    <div className="h-10"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard project={project} key={project.title}></ProjectCard>
                        ))}
                    </div>
                    <div className="h-10"></div>
                </div>}

            </div>

        </HeaderLayout>
    );
};

export default DeveloperDetails;
