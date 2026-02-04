import React from 'react';
import TripProps from "@/Interfaces/Site/TripProps";
import {Card} from "@/Pages/Site/components/ui/card";
import {Container} from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";
import {Badge} from "@/Pages/Site/components/ui/badge";
import {CardContent} from "@/Pages/Site/components/ui/card";
import {Calendar, Clock, Users } from 'lucide-react';
import {Link, usePage} from "@inertiajs/react";
import {Button} from "@/Pages/Site/components/ui/button";
import {useTranslation} from "react-i18next";

const TripCard: React.FC<{
    trip: TripProps, featured: boolean, packages: TripProps[]
}> = ({trip, featured, packages}) => {
    const blockService = Container.get(BlockService);
    const linkedPackage = trip.tripPackage
        ? packages.find((p) => p.title === trip.tripPackage)
        : null;
    const {t} = useTranslation();

    const nextDate = trip.appointments
        .filter((d) => new Date(d.startDate) >= new Date())
        .sort((a, b) => (new Date(a.startDate)).getTime() - (new Date(b.startDate)).getTime())[0];

    const {lang} = usePage().props;

    // const totalSpots = trip.appointments.reduce((sum, d) => sum + d.spotsAvailable, 0);

    return (
        <Card
            className={`group overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl ${
                featured ? "md:col-span-2 md:row-span-2" : ""
            }`}
        >
            <div className={`relative ${featured ? "h-72" : "h-48"} overflow-hidden`}>
                <img
                    src={blockService.getImageUrl(trip.images[0].url)}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground font-semibold text-sm px-3 py-1">
                        {trip.price.toLocaleString()} AED
                    </Badge>
                </div>

                {/* Package Link Badge */}
                {linkedPackage && (
                    <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-border">
                            {linkedPackage.title}
                        </Badge>
                    </div>
                )}

                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {trip.tags.slice(0, 3).map((tag) => (
                        <Badge
                            key={tag.title}
                            variant="secondary"
                            className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs"
                        >
                            {tag.title}
                        </Badge>
                    ))}
                </div>
            </div>

            <CardContent className="p-5">
                <h3 className={`font-heading font-bold text-foreground mb-2 ${featured ? "text-2xl" : "text-lg"}`}>
                    {trip.title}
                </h3>
                <p
                    className="text-muted-foreground text-sm mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: trip.description }}
                >

                </p>

                {/* Trip Details */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{trip.duration} {Number(trip.duration) === 1 ? trip.unit : trip.unit + 's'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Max {trip.maxGuests}</span>
                    </div>
                    {nextDate && (
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>
                {(new Date(nextDate.startDate)).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })}
              </span>
                        </div>
                    )}
                </div>

                {/* Available Spots */}
                <div className="flex items-center justify-between">
          {/*<span className="text-sm text-muted-foreground">*/}
          {/*  {totalSpots} spots across {trip.dates.length} dates*/}
          {/*</span>*/}
                    <Button asChild variant="hero" size="sm">
                        <Link href={`/${lang}/trip/${trip.slug}`}>{t('view-trip')}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default TripCard;
