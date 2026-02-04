import React from 'react';
import TripProps from "@/Interfaces/Site/TripProps";
import {Head, Link, usePage} from "@inertiajs/react";
import {Calendar, Check, ChevronLeft, Clock, MapPin, Users, X } from 'lucide-react';
import {Button} from "@/Pages/Site/components/ui/button";
import {Container} from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";
import TripService from "@/Services/BlockService/TripService";
import {Badge} from "@/Pages/Site/components/ui/badge";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import { useTranslation } from 'react-i18next';

const PackageDetails: React.FC<{tripPackage: TripProps, trips: TripProps[]}> = ({tripPackage, trips}) => {
    const blockService = Container.get(BlockService);
    const tripService = Container.get(TripService);

    console.log(tripPackage);

    const {lang} = usePage().props;
    const {t} = useTranslation();

    const tier = tripService.getTier(tripPackage);

    return (
        <HeaderLayout>
            <Head title={'Packages'}/>
            {/*</Head>*/}
            <main>
                {/* Hero */}
                <section className="relative h-[50vh] min-h-[400px]">
                    <img
                        src={blockService.getImageUrl(tripPackage.images[0].url)}
                        alt={tripPackage.title}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"/>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="container mx-auto">
                            {/*<Link*/}
                            {/*    href={`/${lang}/package`}*/}
                            {/*    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"*/}
                            {/*>*/}
                            {/*    <ChevronLeft className="w-4 h-4"/>*/}
                            {/*    Back to Packages*/}
                            {/*</Link>*/}
                            {tier &&
                                <Badge variant={tripService?.getTierBadge(tripPackage) || "default"} className="mb-4">
                                    {/*{tier.badgeText.charAt(0).toUpperCase() + tier.badgeText.slice(1)}*/}
                                    {t(tier?.badgeText ?? '')}
                                </Badge>}
                            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
                                {tripPackage.title}
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-6 p-6 bg-card rounded-2xl shadow-soft">
                                    <div className="text-center">
                                        <Clock className="w-8 h-8 text-primary mx-auto mb-2"/>
                                        <span className="text-sm text-muted-foreground block">{t('duration')}</span>
                                        <span
                                            className="text-lg font-semibold text-foreground" dir="ltr"
                                        >{tripPackage.duration} {Number(tripPackage.unit) === 1 ? tripPackage.unit : tripPackage.unit + 's'}</span>
                                    </div>
                                    <div className="text-center">
                                        <Users className="w-8 h-8 text-primary mx-auto mb-2"/>
                                        <span className="text-sm text-muted-foreground block">{t('max-guest')}</span>
                                        <span
                                            className="text-lg font-semibold text-foreground">{tripPackage.maxGuests}</span>
                                    </div>
                                    <div className="text-center">
                                        <Calendar className="w-8 h-8 text-primary mx-auto mb-2"/>
                                        <span className="text-sm text-muted-foreground block">{t('min-age')}</span>
                                        <span
                                            className="text-lg font-semibold text-foreground">{tripPackage.minAge}+</span>
                                    </div>
                                </div>

                                {/* Activity Plan */}
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                                        {t('activity-plan')}
                                    </h2>
                                    {/*<div*/}
                                    {/*    className="prose prose-lg max-w-none text-muted-foreground [&_h3]:text-foreground [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-2"*/}
                                    {/*    dangerouslySetInnerHTML={{__html: pkg.activityPlan}}*/}
                                    {/*/>*/}
                                    <div
                                        className="prose prose-lg max-w-none text-muted-foreground [&_h3]:text-foreground [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-2"
                                        dangerouslySetInnerHTML={{__html: tripPackage.description}}
                                    />
                                </div>

                                {/* What's Included */}
                                {/*<div className="grid md:grid-cols-2 gap-8">*/}
                                {/*    <div>*/}
                                {/*        <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">*/}
                                {/*        <Check className="w-5 h-5 text-green-500"/>*/}
                                {/*            What's Included*/}
                                {/*        </h3>*/}
                                {/*        <ul className="space-y-3">*/}
                                {/*            {pkg.includedFeatures.map((feature) => (*/}
                                {/*                <li*/}
                                {/*                    key={feature}*/}
                                {/*                    className="flex items-start gap-3 text-muted-foreground"*/}
                                {/*                >*/}
                                {/*                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-1"/>*/}
                                {/*                    {feature}*/}
                                {/*                </li>*/}
                                {/*            ))}*/}
                                {/*        </ul>*/}
                                {/*    </div>*/}
                                {/*    {pkg.excludedFeatures.length > 0 && (*/}
                                {/*        <div>*/}
                                {/*            <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">*/}
                                {/*                <X className="w-5 h-5 text-destructive"/>*/}
                                {/*                Not Included*/}
                                {/*            </h3>*/}
                                {/*            <ul className="space-y-3">*/}
                                {/*                {pkg.excludedFeatures.map((feature) => (*/}
                                {/*                    <li*/}
                                {/*                        key={feature}*/}
                                {/*                        className="flex items-start gap-3 text-muted-foreground"*/}
                                {/*                    >*/}
                                {/*                        <X className="w-4 h-4 text-destructive shrink-0 mt-1"/>*/}
                                {/*                        {feature}*/}
                                {/*                    </li>*/}
                                {/*                ))}*/}
                                {/*            </ul>*/}
                                {/*        </div>*/}
                                {/*    )}*/}
                                {/*</div>*/}

                                {/* Related Trips */}
                                {trips.length > 0 && (
                                    <div>
                                        <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                                            {t('upcoming-trips')}
                                        </h2>
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {trips.map((trip) => (
                                                <div
                                                    key={trip.id}
                                                    className="bg-card rounded-xl overflow-hidden shadow-soft hover-lift"
                                                >
                                                    <img
                                                        src={blockService.getImageUrl(trip.images[0].url)}
                                                        alt={trip.title}
                                                        className="w-full h-40 object-cover"
                                                    />
                                                    <div className="p-4">
                                                        <div
                                                            className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                            <Calendar className="w-4 h-4"/>
                                                            {trip.startDate}
                                                        </div>
                                                        <h3 className="font-heading font-semibold text-foreground mb-2">
                                                            {trip.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            {trip.brief}
                                                        </p>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-semibold text-primary">
                                                                {trip.price.toLocaleString()} AED
                                                            </span>
                                                            <Link href={trip.tripPackage ? `/${lang}/package` : `/${lang}/trip`}>
                                                                <Button size="sm" variant="outline">
                                                                    {t('book')}
                                                                </Button>
                                                            </Link>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28 bg-card rounded-2xl shadow-soft p-6 space-y-6">
                                    <div>
                                        <span className="text-sm text-muted-foreground">{t('starting-from')}</span>
                                        <div className="flex items-baseline gap-2">
                              <span className="font-heading text-4xl font-bold text-primary">
                                {tripPackage.price.toLocaleString()}
                              </span>
                                            <span className="text-muted-foreground">AED</span>
                                        </div>
                                        {/*<p className="text-sm text-muted-foreground mt-1">*/}
                                        {/*    Minimum price: {pkg.minPrice.toLocaleString()} AED*/}
                                        {/*</p>*/}
                                    </div>

                                    <Button variant="gold" size="xl" className="w-full">
                                        {t('book-this-package')}
                                    </Button>

                                    <div className="pt-6 border-t border-border space-y-4">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-primary"/>
                                            <span className="text-sm text-muted-foreground">
                                                {tripPackage.city}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-primary"/>
                                            <span className="text-sm text-muted-foreground">
                                                    {tripPackage.duration} {tripPackage.unit}
                                                </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-primary"/>
                                            <span className="text-sm text-muted-foreground">
                                                {t('guests', {guest: tripPackage.maxGuests, adj: Number(tripPackage.maxGuests) === 1 ? t('gst') : t('gsts')})}
                                                    {/*Up to {tripPackage.maxGuests} guests*/}
                                                </span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border">
                                        <p className="text-sm text-muted-foreground text-center">
                                            {t('need-help')}{" "}
                                            <a href={`/${lang}/contact`} className="text-primary font-medium hover:underline">
                                                {t('contact-us')}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </HeaderLayout>
);
};

export default PackageDetails;
