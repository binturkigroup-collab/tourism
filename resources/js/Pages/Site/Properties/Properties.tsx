import React from 'react';
import {Head, usePage} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import PropertyProps from "@/Interfaces/Site/PropertyProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { MapPin, Building2, Bed, Maximize, Landmark } from "lucide-react";
import BlockService from "@/Services/BlockService/BlockService";
import {Container} from "typedi";
import "reflect-metadata";
import {useTranslation} from "react-i18next";
import {Link} from "@inertiajs/react";
import SEO from "@/Pages/Site/components/SEO";
import BlockProps from "@/Interfaces/Site/BlockProps";
import SearchFilters from "@/Interfaces/Site/SearchFilters";
import AdvancedSearch from "@/Pages/Site/components/AdvancedSearch";
import FormService from "@/Services/FormService/FormService";

const Properties: React.FC<{
    properties: PropertyProps [],
    developers: BlockProps [],
    communities: BlockProps [],
    cities: BlockProps [],
}> = ({properties, developers, communities, cities}) => {
    const formService = Container.get(FormService);
    const blockService = Container.get(BlockService);
    const [filtererProperties, setFilteredProperties] = React.useState(properties);

    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    const {lang} = usePage().props

    const [filters, setFilters] = React.useState<SearchFilters>({
        developerSlug: '',
        communitySlug: params.communitySlug || '',
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
        blockService.getProperties(lang, query).then(response => {
            // console.log('res: ', response.data);
            setFilteredProperties(response.data);
        })
    }, [filters]);
    const {t} = useTranslation();
    return (
        <div>
            <HeaderLayout>
                <Head title={'Properties'}>
                    {/*<SEO*/}
                    {/*    title="Featured Properties"*/}
                    {/*    description="Browse exclusive properties for sale and rent in Dubai and Abu Dhabi. Find apartments, villas, townhouses, and commercial properties from top developers like Emaar and Nakheel."*/}
                    {/*    canonical="https://prestigepropertydxb.com/en/properties"*/}
                    {/*    structuredData={properties}*/}
                    {/*/>*/}
                </Head>
                <div className="min-h-screen bg-background">
                    <header className="border-b border-border bg-white">
                        <div className="container mx-auto px-4 py-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                                {t('featured-properties')}
                            </h1>
                            <p className="text-muted-foreground max-w-2xl">
                                {t('property-hero')}
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
                            {filtererProperties.map((property) => (
                                <Card
                                    key={property.title}
                                    className="group hover:border-secondary transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 cursor-pointer overflow-hidden"
                                >
                                    <Link href={`/${lang}/properties/${property.slug}`}>
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={blockService.getImageUrl(property.images[0].url)}
                                                alt={property.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <Badge className="absolute top-4 right-4 bg-secondary text-primary-foreground">
                                                {property.status}
                                            </Badge>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="text-foreground">{property.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <Landmark className="w-4 h-4 text-secondary flex-shrink-0" />
                                                    <span className="text-sm text-muted-foreground">{property.developerName}</span>
                                                </div>

                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                                                    <div className="text-sm text-muted-foreground">
                                                        <div>{property.communityName} - {property.cityName}</div>
                                                        {/*<div>{property.cityName}</div>*/}
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    {property?.numberOfBeds > 0 && (
                                                        <div className="flex items-center gap-1">
                                                            <Bed className="w-4 h-4 text-secondary" />
                                                            <span className="text-sm text-muted-foreground">{property.numberOfBeds} beds</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1">
                                                        <Maximize className="w-4 h-4 text-secondary" />
                                                        <span className="text-sm text-muted-foreground">{property.area} sqft</span>
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t border-border">
                                                    <div className="text-xl font-bold text-secondary">
                                                        AED { new Intl.NumberFormat().format(property.price)}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </main>
                </div>
            </HeaderLayout>
        </div>
    );
};

export default Properties;
