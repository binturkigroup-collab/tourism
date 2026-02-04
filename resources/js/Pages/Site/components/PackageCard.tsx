// import { TourPackage } from "@/data/packages";
import { Badge } from "@/Pages/Site/components/ui/badge";
import { Button } from "@/Pages/Site/components/ui/button";
import { Clock, Users, Calendar, Check, X, ChevronRight, ChevronLeft } from "lucide-react";
import TripProps from "@/Interfaces/Site/TripProps";
import PackageEnum from "@/Enums/PackageEnum";
import {Link, usePage} from "@inertiajs/react";
import {Container} from "typedi";
import "reflect-metadata";
import TripService from "@/Services/BlockService/TripService";
import {useTranslation} from "react-i18next";

interface PackageCardProps {
  pkg: TripProps;
  featured?: boolean;
}

const PackageCard = ({ pkg, featured = false }: PackageCardProps) => {
    const tripService = Container.get(TripService);
    const {lang} = usePage().props;
    const tier = tripService.getTier(pkg);
    const {t} = useTranslation();

  return (
    <div
      className={`relative group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${
        featured ? "ring-2 ring-primary" : ""
      }`}
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-br ${tier?.gradient} p-6 pb-8 min-h-[140px] flex flex-col justify-between`}>
        <div className="flex justify-between items-start mb-4">
          <Badge variant={tier?.badge}>{t(tier?.badgeText ?? '')}</Badge>
          {featured && (
            <Badge variant="gold" className="animate-pulse">
              Most Popular
            </Badge>
          )}
        </div>

        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          {pkg.title}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">{t('starting-from')}</span>
          <span className="font-heading text-2xl font-bold text-primary">
            {pkg.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground">AED</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-1">
        <div className="space-y-6 flex-1">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
              <span className="text-xs text-muted-foreground block">{t('duration')}</span>
              <span className="text-sm font-semibold text-foreground" dir="ltr">{`${pkg.duration} ${Number(pkg.unit) === 1 ? pkg.unit : pkg.unit + 's'}`}</span>
            </div>
            <div className="text-center">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <span className="text-xs text-muted-foreground block">{t('max-guest')}</span>
              <span className="text-sm font-semibold text-foreground">{pkg.maxGuests}</span>
            </div>
            <div className="text-center">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
              <span className="text-xs text-muted-foreground block">{t('min-age')}</span>
              <span className="text-sm font-semibold text-foreground">{pkg.minAge}+</span>
            </div>
          </div>

          {/* Included Features */}
          {/*<div className="space-y-2">*/}
          {/*  <h4 className="text-sm font-semibold text-foreground">What's Included</h4>*/}
          {/*  <ul className="space-y-1.5">*/}
          {/*    {pkg.includedFeatures.slice(0, 4).map((feature) => (*/}
          {/*      <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">*/}
          {/*        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />*/}
          {/*        {feature}*/}
          {/*      </li>*/}
          {/*    ))}*/}
          {/*    {pkg.includedFeatures.length > 4 && (*/}
          {/*      <li className="text-sm text-primary font-medium">*/}
          {/*        +{pkg.includedFeatures.length - 4} more features*/}
          {/*      </li>*/}
          {/*    )}*/}
          {/*  </ul>*/}
          {/*</div>*/}

          {/* Excluded Features */}
          {/*{pkg.excludedFeatures.length > 0 && (*/}
          {/*  <div className="space-y-2">*/}
          {/*    <h4 className="text-sm font-semibold text-foreground">Not Included</h4>*/}
          {/*    <ul className="space-y-1.5">*/}
          {/*      {pkg.excludedFeatures.slice(0, 2).map((feature) => (*/}
          {/*        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">*/}
          {/*          <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />*/}
          {/*          {feature}*/}
          {/*        </li>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>

        {/* CTA - Always at bottom */}
        <div className="pt-6 mt-auto">
          <Link href={`/${lang}/package/${pkg.slug}`}>
            <Button
              variant={tripService.getTierType(pkg) === "vip" ? "gold" : tripService.getTierType(pkg) === "adventure" ? "teal" : "default"}
              size="lg"
              className="w-full group"
            >
                {t('details')}
                {lang === 'en' ?
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    :
                    <ChevronLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                }
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
