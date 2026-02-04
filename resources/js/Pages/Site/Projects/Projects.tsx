import React from 'react';
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import {Head, usePage} from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Button } from "@/Pages/Site/components/ui/button";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { ArrowLeft, MapPin, Building2, Calendar, Landmark } from "lucide-react";
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import {useTranslation} from "react-i18next";
import {Link} from "@inertiajs/react";
import ProjectStatusEnum from "@/Enums/ProjectStatusEnum";
import SEO from "@/Pages/Site/components/SEO";
import BlockProps from "@/Interfaces/Site/BlockProps";
import FormService from "@/Services/FormService/FormService";
import SearchFilters from "@/Interfaces/Site/SearchFilters";
import AdvancedSearch from "@/Pages/Site/components/AdvancedSearch";
import ProjectCard from "@/Pages/Site/Projects/ProjectDetails/ProjectCard";

const Projects: React.FC<{
    projects: ProjectProps [],
    developers: BlockProps [],
    communities: BlockProps [],
    cities: BlockProps [],
}> = ({projects, developers, communities, cities}) => {
    const formService = Container.get(FormService);
    const blockService = Container.get(BlockService);
    const {lang} = usePage().props;
    const {t} = useTranslation();

    const params = Object.fromEntries(new URLSearchParams(window.location.search));

    const [filtererProjects, setFilteredProjects] = React.useState(projects);
    const [filters, setFilters] = React.useState<SearchFilters>({
        developerSlug: params.developerSlug || '',
        communitySlug: '',
        citySlug: '',
        minPrice: 0,
        maxPrice: 0,
    });

    const handleQuery = (filter: SearchFilters) => {
        return Object.entries(filter)
            .filter(([_, value]) => (value as number) !== 0)
            .filter(([_, value]) => (value as string) !== '')
            .map(([key, value]) => ({key, value}))
    }

    React.useEffect(() => {
        const filterQuery = handleQuery(filters);
        const query = formService.formQuery(...filterQuery);
        blockService.getProjects(lang, query).then(response => {
            setFilteredProjects(response.data);
        })
    }, [filters]);

    return (
        <HeaderLayout>
            <Head title={'Projects'}>
                {/*<SEO*/}
                {/*    title="Featured Projects"*/}
                {/*    description="Discover premium off-plan and ready real estate projects in Dubai and Abu Dhabi. Browse apartments, villas, townhouses, and commercial properties from top developers."*/}
                {/*    canonical="https://prestigepropertydxb.com/en/projects"*/}
                {/*    structuredData={projects}*/}
                {/*/>*/}
            </Head>

            <div className="min-h-screen bg-background">
                <header className="border-b border-border bg-card">
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                            {t('featured-projects')}
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            {t('projects-hero')}
                        </p>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-12">
                    <AdvancedSearch
                        developers={developers}
                        communities={communities}
                        cities={cities}
                        onSearch={setFilters}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtererProjects.map((project) => (
                            // <Link href={`/projects/${project.id}`}>
                            //
                            // </Link>
                            <ProjectCard project={project} key={project.title}></ProjectCard>
                        ))}
                    </div>
                </main>
            </div>
            );
        </HeaderLayout>
    );
};

export default Projects;
