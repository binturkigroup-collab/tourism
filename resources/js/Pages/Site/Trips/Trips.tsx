import HeaderLayout from '@/Layouts/Site/HeaderLayout';
import React from 'react';
import { Head } from '@inertiajs/react';
import TripProps from "@/Interfaces/Site/TripProps";
import {ChevronDown, ChevronUp, Filter, Search, X } from 'lucide-react';
import {Input} from "@/Pages/Site/components/ui/input";
import {Button} from "@/Pages/Site/components/ui/button";
import {Badge} from "@/Pages/Site/components/ui/badge";
import TripCard from "@/Pages/Site/Trips/TripCard";
import {useTranslation} from "react-i18next";

const Trips: React.FC<{
    packages: TripProps[],
    trips: TripProps[],
}> = ({packages, trips}) => {
    // return (
    //     <HeaderLayout>
    //         <Head title={'About Us'}>
    //         </Head>
    //
    //         <div>Trips</div>
    //
    //     </HeaderLayout>
    // )

    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null);
    const [tagsExpanded, setTagsExpanded] = React.useState(false);
    const {t} = useTranslation();

    // Get all unique tags
    const allTags = React.useMemo(() => {
        const tags = new Set<string>();
        trips.forEach((trip) => trip.tags.forEach((tag) => tags.add(tag.title)));
        return Array.from(tags).sort();
    }, []);

    // Limit tags shown when collapsed
    const MOBILE_TAG_LIMIT = 4;
    const DESKTOP_TAG_LIMIT = 8;
    const visibleTagsMobile = tagsExpanded ? allTags : allTags.slice(0, MOBILE_TAG_LIMIT);
    const visibleTagsDesktop = tagsExpanded ? allTags : allTags.slice(0, DESKTOP_TAG_LIMIT);
    const hasMoreTagsMobile = allTags.length > MOBILE_TAG_LIMIT;
    const hasMoreTagsDesktop = allTags.length > DESKTOP_TAG_LIMIT;

    // Filter trips
    const filteredTrips = React.useMemo(() => {
        return trips.filter((trip) => {
            // if (!trip.isActive) return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesSearch =
                    trip.title.toLowerCase().includes(query) ||
                    trip.brief.toLowerCase().includes(query) ||
                    trip.description.toLowerCase().includes(query) ||
                    trip.tags.some((tag) => tag.title.toLowerCase().includes(query));
                if (!matchesSearch) return false;
            }

            // Tag filter
            if (selectedTags.length > 0) {
                const hasAllTags = selectedTags.every((tag) =>
                    trip.tags.map(tag => tag.title).includes(tag));
                if (!hasAllTags) return false;
            }

            // Package filter
            if (selectedPackage) {
                if (trip.tripPackage !== selectedPackage) return false;
            }

            return true;
        });
    }, [searchQuery, selectedTags, selectedPackage]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedTags([]);
        setSelectedPackage(null);
    };

    const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedPackage;

    return (

        <HeaderLayout>
            <Head title={'About Us'}>
            </Head>

            <main>
                {/* Hero Section */}
                <section
                    className="relative py-8 md:py-12 bg-gradient-to-br from-secondary via-background to-background overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B89755' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}/>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                {t('our-discover')}{" "}
                                <span className="text-primary">{t('our-trips')}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground">
                                {t('trips-hero')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="py-8 border-b border-border bg-background/95 backdrop-blur-sm z-40">
                    <div className="container mx-auto px-4">
                        {/* Search */}
                        <div className="relative max-w-md mx-auto mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                            <Input
                                type="text"
                                placeholder={`${t('search')}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-background"
                            />
                        </div>

                        {/* Tags - Collapsible on mobile */}
                        <div className="mb-4">
                            {/* Mobile: limited tags with expand button */}
                            <div className="flex flex-wrap justify-center gap-2 md:hidden">
                                {visibleTagsMobile.map((tag, index) => (
                                    <Badge
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                                        className={`cursor-pointer transition-all animate-scale-in ${
                                            selectedTags.includes(tag)
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-primary/10"
                                        }`}
                                        style={{animationDelay: `${index * 30}ms`, animationFillMode: 'backwards'}}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                {hasMoreTagsMobile && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setTagsExpanded(!tagsExpanded)}
                                        className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground transition-all duration-200"
                                    >
                                        {tagsExpanded ? (
                                            <>
                                                <ChevronUp className="w-3 h-3 mr-1 transition-transform duration-200"/>
                                                Less
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown
                                                    className="w-3 h-3 mr-1 transition-transform duration-200"/>
                                                +{allTags.length - MOBILE_TAG_LIMIT} more
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>

                            {/* Desktop: show limited tags with expand option */}
                            <div className="hidden md:flex flex-wrap justify-center gap-2">
                                {visibleTagsDesktop.map((tag) => (
                                    <Badge
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                                        className={`cursor-pointer transition-all ${
                                            selectedTags.includes(tag)
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-primary/10"
                                        }`}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                                {hasMoreTagsDesktop && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setTagsExpanded(!tagsExpanded)}
                                        className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground transition-all duration-200"
                                    >
                                        {tagsExpanded ? (
                                            <>
                                                <ChevronUp className="w-3 h-3 mr-1"/>
                                                Show less
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="w-3 h-3 mr-1"/>
                                                +{allTags.length - DESKTOP_TAG_LIMIT} more
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Package Filter */}
                        <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Filter className="w-4 h-4"/>
                  {t('pac')}:
              </span>
                            {packages.map((pkg) => (
                                <Badge
                                    key={pkg.tripPackage}
                                    variant={selectedPackage === pkg.tripPackage ? "default" : "outline"}
                                    className={`cursor-pointer transition-all ${
                                        selectedPackage === pkg.tripPackage
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-primary/10"
                                    }`}
                                    onClick={() =>
                                        setSelectedPackage((prev) =>
                                            prev === pkg.tripPackage ? null : pkg.tripPackage
                                        )
                                    }
                                >
                                    {pkg.title}
                                </Badge>
                            ))}
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <div className="flex justify-center mt-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-4 h-4 mr-1"/>
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Trips Grid */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        {filteredTrips.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-xl text-muted-foreground mb-4">
                                    No trips found matching your criteria
                                </p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear filters
                                </Button>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Showing {filteredTrips.length} trip
                                    {filteredTrips.length !== 1 ? "s" : ""}
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredTrips.map((trip, index) => (
                                        <TripCard
                                            key={trip.id}
                                            trip={trip}
                                            featured={index === 0}
                                            packages={packages}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main>

        </HeaderLayout>

    );
};

export default Trips;
