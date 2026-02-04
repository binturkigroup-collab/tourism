import { useState, useMemo } from "react";
// import { sampleTrips, packages, Trip as PackageTrip } from "@/data/packages";
// import { trips as normalTrips, Trip as NormalTrip } from "@/data/trips";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { Button } from "@/Pages/Site/components/ui/button";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Pages/Site/components/ui/tooltip";
import tripYacht from "@/assets/trip-yacht.jpg";
import tripCity from "@/assets/trip-city.jpg";
import tripAdventure from "@/assets/trip-adventure.jpg";
import tripDhow from "@/assets/trip-dhow.jpg";
import TripProps from "@/Interfaces/Site/TripProps";
import {Container} from "typedi";
import "reflect-metadata";
import BlockService from "@/Services/BlockService/BlockService";
import TripService from "@/Services/BlockService/TripService";
import {useTranslation} from "react-i18next";
// const tripImages: Record<string, string> = {
//   "/trip-yacht.jpg": tripYacht,
//   "/trip-city.jpg": tripCity,
//   "/trip-adventure.jpg": tripAdventure,
//   "/trip-dhow.jpg": tripDhow,
// };

// Unified calendar entry type
interface CalendarEntry {
  id: string;
  title: string;
  brief: string;
  price: number;
  date: Date;
  image: string;
  packageId?: string;
  type: "package" | "trip";
  spotsAvailable?: number;
}

const TripCalendar: React.FC<{trips: TripProps [], packages: TripProps []}> = ({trips, packages}) => {
    const blockService = Container.get(BlockService);
    const tripService = Container.get(TripService);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const {t} = useTranslation();

  // Combine package trips and normal trips into unified calendar entries
  const allCalendarEntries = useMemo(() => {
    const entries: CalendarEntry[] = [];

    // Add package trips
    // packages.forEach((trip) => {
    //   entries.push({
    //     id: trip.id.toString(),
    //     title: trip.title,
    //     brief: trip.brief,
    //     price: Number(trip.price) || 0,
    //     date: new Date(trip.appointments[0]?.startDate.replace(' ', 'T') + 'Z'),
    //     image: blockService.getImageUrl( trip.images[0].url),
    //     packageId: trip.id.toString(),
    //     type: "package",
    //   });
    // });

      packages.forEach((pkg) => {
          pkg.appointments.forEach((pkgDate) => {
              entries.push({
                  id: `${pkg.id}-${pkgDate.id}`,
                  title: pkg.title,
                  brief: pkg.brief,
                  price:  Number(pkg.price) || 0,
                  date: new Date(pkgDate.startDate.replace(' ', 'T') + 'Z'),
                  image: blockService.getImageUrl( pkg.images[0].url),
                  packageId: pkg.id.toString(),
                  type: "package",
                  // spotsAvailable: pkgDate.spotsAvailable,
              });
          });
      });

    // Add normal trips (each date becomes an entry)
    trips.forEach((trip) => {
        if (trip.appointments.length > 0) {
            trip.appointments.forEach((tripDate) => {
                entries.push({
                    id: `${trip.id}-${tripDate.id}`,
                    title: trip.title,
                    brief: trip.brief,
                    price: Number(trip.price) || 0,
                    date: new Date(tripDate.startDate.replace(' ', 'T') + 'Z'),
                    image: blockService.getImageUrl( trip.images[0].url),
                    packageId: trip.id.toString(),
                    type: "trip",
                    // spotsAvailable: tripDate.spotsAvailable,
                });
            });
        }

    });

    return entries;
  }, []);

  // Get entries for selected date
  const entriesOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return allCalendarEntries.filter((entry) =>
      isSameDay(entry.date, selectedDate)
    );
  }, [selectedDate, allCalendarEntries]);

  const hasEntriesOnDay = (day: Date) => {
    return allCalendarEntries.some((entry) => isSameDay(entry.date, day));
  };

  const getEntriesForDay = (day: Date) => {
    return allCalendarEntries.filter((entry) => isSameDay(entry.date, day));
  };

  const getPackageTier = (packageId?: string): string => {
    if (!packageId) return "trip";
    const tier = packages.find((p) => p.id.toString() === packageId);
    // console.log('tier', tripService.getTierType(tier));
    // return packages.find((p) => p.id.toString() === packageId)?.tripPackage || "trip";
      return tripService.getTierType(tier);
  };

  const tierColors: Record<string, string> = {
    standard: "bg-slate-500",
    deluxe: "bg-amber-500",
    adventure: "bg-emerald-500",
    vip: "bg-purple-500",
    trip: "bg-cyan-500",
  };

  return (
    <TooltipProvider delayDuration={200}>
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              {t('trip-calendar')}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
                {t('plan-your')} <span className="text-gradient-gold">{t('journey')}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
                {t('plan')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-card rounded-2xl shadow-soft p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  {format(currentDate, "MMMM yyyy")}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month start */}
                {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Day cells */}
                {days.map((day) => {
                  const hasEntries = hasEntriesOnDay(day);
                  const entriesForDay = getEntriesForDay(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, new Date());

                  const dayButton = (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-xl p-1 flex flex-col items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2"
                          : hasEntries
                          ? "bg-primary/10 hover:bg-primary/20"
                          : "hover:bg-muted"
                      } ${isToday && !isSelected ? "ring-2 ring-primary/50" : ""}`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          isSelected ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                      {hasEntries && (
                        <div className="flex gap-0.5 mt-1">
                          {entriesForDay.slice(0, 3).map((entry, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                tierColors[getPackageTier(entry.packageId)]
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );

                  if (hasEntries) {
                    return (
                      <Tooltip key={day.toISOString()}>
                        <TooltipTrigger asChild>
                          {dayButton}
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs p-3" side="top">
                          <div className="space-y-2">
                            <p className="font-semibold text-sm border-b border-border pb-1">
                              {format(day, "EEEE, MMM d")}
                            </p>
                            {entriesForDay.map((entry) => {
                              const pkg = packages.find((p) => p.id.toString() === entry.packageId);
                              const tierLabel = entry.packageId ? pkg?.title : "Trip";
                              return (
                                <div key={entry.id} className="flex items-start gap-2">
                                  <div
                                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                                      tierColors[getPackageTier(entry.packageId)]
                                    }`}
                                  />
                                  <div>
                                    <p className="font-medium text-sm">{entry.title}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {tierLabel} • {entry.price.toLocaleString()} AED
                                      {entry.spotsAvailable !== undefined && ` • ${entry.spotsAvailable} spots`}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return dayButton;
                })}
              </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500" />
                <span className="text-sm text-muted-foreground">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-muted-foreground">Deluxe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-muted-foreground">Adventure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-sm text-muted-foreground">VIP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-sm text-muted-foreground">Trip</span>
              </div>
            </div>
          </div>

          {/* Selected Date Trips */}
          <div className="bg-card rounded-2xl shadow-soft p-6">
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              {selectedDate
                ? format(selectedDate, "EEEE, MMMM d, yyyy")
                : t('select-date')}
            </h4>

            {selectedDate && entriesOnSelectedDate.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No trips scheduled for this date.
              </p>
            )}

            <div className="space-y-4">
              {entriesOnSelectedDate.map((entry) => {
                const pkg = packages.find((p) => p.id.toString() === entry.packageId);
                const tierLabel = entry.packageId ? pkg?.title : "Trip";
                const tier = getPackageTier(entry.packageId);
                return (
                  <div
                    key={entry.id}
                    className="bg-muted/50 rounded-xl overflow-hidden hover-lift"
                  >
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <Badge
                        variant={tier === "vip" ? "premium" : tier === "trip" ? "secondary" : "gold"}
                        className="mb-2"
                      >
                        {tierLabel}
                      </Badge>
                      <h5 className="font-heading font-semibold text-foreground mb-1">
                        {entry.title}
                      </h5>
                      <p className="text-sm text-muted-foreground mb-3">
                        {entry.brief}
                        {entry.spotsAvailable !== undefined && (
                          <span className="block text-xs mt-1">{entry.spotsAvailable} spots available</span>
                        )}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">
                          {entry.price.toLocaleString()} AED
                        </span>
                        <Button size="sm" variant="outline">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!selectedDate && (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                    {t('click-date')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  </TooltipProvider>
  );
};

export default TripCalendar;
