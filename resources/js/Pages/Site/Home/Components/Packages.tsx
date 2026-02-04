import React from 'react';
import TripProps from "@/Interfaces/Site/TripProps";
import PackageCard from "@/Pages/Site/components/PackageCard";
import { useTranslation } from 'react-i18next';

const Packages: React.FC<{packages: TripProps []}> = ({packages}) => {
    const {t} = useTranslation();
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {t('our-pac')}
          </span>
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
                        {t('choose-your-perfect-adventure')}{" "}
                        <span className="text-gradient-gold">{t('adventure')}</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t('pak-hero-desc')}
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg, index) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            featured={pkg.tripPackage === "deluxe"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Packages;
