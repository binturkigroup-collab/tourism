import React from 'react';
import {Head} from "@inertiajs/react";
import HeaderLayout from '@/Layouts/Site/HeaderLayout';
import TripProps from "@/Interfaces/Site/TripProps";
import {usePage} from "@inertiajs/react";
import {Link} from "@inertiajs/react";
import {Button} from "@/Pages/Site/components/ui/button";
import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Clock,
    MapPin,
    Star,
    Users
} from 'lucide-react';
import {Container} from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";
import {Badge} from "@/Pages/Site/components/ui/badge";
import {Card, CardHeader, CardContent, CardTitle} from "@/Pages/Site/components/ui/card";
import TripCard from "@/Pages/Site/Trips/TripCard";
import {useTranslation} from "react-i18next";

const TripDetails: React.FC<{trip: TripProps, trips: TripProps []}> = ({trip, trips}) => {
    // const { id } = useParams<{ id: string }>();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [selectedDateId, setSelectedDateId] = React.useState<number | null>(null);
    const [tagsExpanded, setTagsExpanded] = React.useState(false);
    const {lang} = usePage().props;
    const blockService = Container.get(BlockService);
    const {t} = useTranslation();

    // const trip = trips.find((t) => t.id === id);

    if (!trip) {
        return (
            <>
                {/*<Navbar />*/}
                <main className="pt-20 min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                            Trip Not Found
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            The trip you're looking for doesn't exist.
                        </p>
                        <Button asChild variant="hero">
                            <Link href={`/${lang}/trip`}>Browse All Trips</Link>
                        </Button>
                    </div>
                </main>
                {/*<Footer />*/}
            </>
        );
    }

    const linkedPackage = trip.tripPackage
        ? trips.find((p) => p.tripPackage === trip.tripPackage)
        : null;

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === trip.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? trip.images.length - 1 : prev - 1
        );
    };

    const upcomingDates = trip.appointments
        .filter((d) => new Date(d.startDate) >= new Date())
        .sort((a, b) => new Date( a.startDate).getTime() - new Date(b.startDate).getTime());

    const selectedDate = selectedDateId
        ? trip.appointments.find((d) => d.id === selectedDateId)
        : null;

    // Find similar trips based on shared tags or same package
    const similarTrips = React.useMemo(() => {
        return trips
            .filter((t) => {
                // if (t.id === trip.id || !t.isActive) return false;

                // Check for shared tags
                const sharedTags = t.tags.filter((tag) => trip.tags.includes(tag));
                const hasSharedTags = sharedTags.length > 0;

                // Check for same package
                const samePackage = trip.tripPackage && t.tripPackage === trip.tripPackage;

                return hasSharedTags || samePackage;
            })
            .map((t) => ({
                trip: t,
                score: t.tags.filter((tag) => trip.tags.includes(tag)).length +
                    (trip.tripPackage && t.tripPackage === trip.tripPackage ? 2 : 0),
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map((item) => item.trip);
    }, [trip]);

    return (
        <HeaderLayout>
            <Head title={'Packages'}/>
            <main>
                {/* Back Navigation */}
                {/*<div className="container mx-auto px-4 py-4">*/}
                {/*    <Button asChild variant="ghost" className="text-muted-foreground">*/}
                {/*        <Link href={`/${lang}/trip`}>*/}
                {/*            <ArrowLeft className="w-4 h-4 mr-2"/>*/}
                {/*            Back to Trips*/}
                {/*        </Link>*/}
                {/*    </Button>*/}
                {/*</div>*/}

                {/* Hero Image Gallery */}
                <section className="relative">
                    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                        <img
                            src={blockService.getImageUrl(trip.images[currentImageIndex].url)}
                            alt={`${trip.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"/>

                        {/* Navigation Arrows */}
                        {trip.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-6 h-6"/>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-6 h-6"/>
                                </button>
                            </>
                        )}

                        {/* Image Dots */}
                        {trip.images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {trip.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                                            index === currentImageIndex
                                                ? "bg-primary w-8"
                                                : "bg-white/50 hover:bg-white/80"
                                        }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Thumbnails */}
                        <div className="absolute bottom-6 right-6 hidden md:flex gap-2">
                            {trip.images.slice(0, 4).map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-16 h-12 rounded-md overflow-hidden border-2 transition-all ${
                                        index === currentImageIndex
                                            ? "border-primary"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <img
                                        src={blockService.getImageUrl(img.url)}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Header */}
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        {(tagsExpanded ? trip.tags : trip.tags.slice(0, 3)).map((tag) => (
                                            <Badge key={tag.title} variant="secondary">
                                                {tag.title}
                                            </Badge>
                                        ))}
                                        {trip.tags.length > 3 && (
                                            <button
                                                onClick={() => setTagsExpanded(!tagsExpanded)}
                                                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                                            >
                                                {tagsExpanded ? (
                                                    <>
                                                        Show less
                                                        <ChevronUp className="w-4 h-4"/>
                                                    </>
                                                ) : (
                                                    <>
                                                        +{trip.tags.length - 3} more
                                                        <ChevronDown className="w-4 h-4"/>
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                                        {trip.title}
                                    </h1>
                                    <p className="text-xl text-muted-foreground">{trip.brief}</p>
                                </div>

                                {/* Quick Info */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                                        <Clock className="w-6 h-6 text-primary"/>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Duration</p>
                                            <p className="font-semibold text-foreground">{trip.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                                        <Users className="w-6 h-6 text-primary"/>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Max Guests</p>
                                            <p className="font-semibold text-foreground">{trip.maxGuests}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                                        <Star className="w-6 h-6 text-primary"/>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Min Age</p>
                                            <p className="font-semibold text-foreground">{trip.minAge}+</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                                        <Calendar className="w-6 h-6 text-primary"/>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Dates</p>
                                            <p className="font-semibold text-foreground">{upcomingDates.length} available</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                                        About This Trip
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {trip.description}
                                    </p>
                                </div>

                                {/* Linked Package */}
                                {linkedPackage && (
                                    <Card className="border-primary/30 bg-primary/5">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-foreground">
                                                <MapPin className="w-5 h-5 text-primary"/>
                                                Part of {linkedPackage.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground mb-4">
                                                This trip is included in our {linkedPackage.title}. Book the
                                                full package for the complete experience.
                                            </p>
                                            <Button asChild variant="outline">
                                                <Link href={`/${lang}/package/${linkedPackage.slug}`}>
                                                    View Package Details
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            {/* Sidebar - Booking Card */}
                            <div className="lg:col-span-1">
                                <Card className="sticky top-28 border-border shadow-lg">
                                    <CardHeader className="bg-gradient-to-br from-primary/10 to-transparent">
                                        <div className="flex items-baseline justify-between">
                                            <div>
                                                <span className="text-3xl font-bold text-foreground">
                                                  {trip.price.toLocaleString()}
                                                </span>
                                                <span className="text-muted-foreground ml-1">AED</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">per person</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        {/* Date Selection */}
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-3">
                                                Select a Date
                                            </h3>
                                            {upcomingDates.length === 0 ? (
                                                <p className="text-muted-foreground text-sm">
                                                    No upcoming dates available. Check back soon!
                                                </p>
                                            ) : (
                                                <div className="space-y-2 max-h-48 overflow-y-auto">
                                                    {upcomingDates.map((d) => (
                                                        <button
                                                            key={d.id}
                                                            onClick={() => setSelectedDateId(d.id)}
                                                            className={`w-full p-3 rounded-lg border text-left transition-all ${
                                                                selectedDateId === d.id
                                                                    ? "border-primary bg-primary/10"
                                                                    : "border-border hover:border-primary/50"
                                                            }`}
                                                        >
                                                            <div className="flex justify-between items-center">
                                <span className="font-medium text-foreground">
                                  {new Date(d.startDate).toLocaleDateString("en-US", {
                                      weekday: "short",
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                  })}
                                </span>
                                                                {/*<Badge*/}
                                                                {/*    variant={d.spotsAvailable < 5 ? "destructive" : "secondary"}*/}
                                                                {/*    className="text-xs"*/}
                                                                {/*>*/}
                                                                {/*    {d.spotsAvailable} spots*/}
                                                                {/*</Badge>*/}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Book Button */}
                                        <Button
                                            variant="hero"
                                            size="lg"
                                            className="w-full"
                                            disabled={!selectedDate || upcomingDates.length === 0}
                                        >
                                            {selectedDate
                                                ? `Book for ${new Date(selectedDate.startDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })}`
                                                : "Select a Date"}
                                        </Button>

                                        {/* Contact Info */}
                                        <div className="pt-4 border-t border-border text-center">
                                            <p className="text-sm text-muted-foreground">
                                                Have questions?{" "}
                                                <Link href={`/${lang}/contact`} className="text-primary hover:underline">
                                                    Contact us
                                                </Link>
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Similar Trips Section */}
                {similarTrips.length > 0 && (
                    <section className="py-12 md:py-16 bg-secondary/30">
                        <div className="container mx-auto px-4">
                            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                                Similar Trips You May Like
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {similarTrips.map((similarTrip) => (
                                    <TripCard key={similarTrip.id} trip={similarTrip} featured={false} packages={[]}/>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </HeaderLayout>
    );
};

export default TripDetails;
