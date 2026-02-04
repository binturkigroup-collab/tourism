import React from 'react';
import PropertyProps from "@/Interfaces/Site/PropertyProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { ArrowLeft, Building2, MapPin, DollarSign, Maximize, Bed, CheckCircle } from "lucide-react";
import "reflect-metadata";
import {useTranslation} from "react-i18next";

const PropertyInfo: React.FC<{property: PropertyProps}> = ({property}) => {
    const price = new Intl.NumberFormat().format(property.price);
    const {t} = useTranslation();
    return (
        <Card className={'bg-background'}>
            <CardHeader>
                <CardTitle className="text-primary">{t('prop-det')}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Building2 className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">{t('dev')}</span>
                        </div>
                        <p className="text-primary font-semibold">{property.developerName}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">{t('comm')}</span>
                        </div>
                        <p className="text-primary font-semibold">{property.communityName}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <DollarSign className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">{t('price')}</span>
                        </div>
                        <p className="text-secondary font-bold text-xl">AED {price}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Maximize className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">{t('area')}</span>
                        </div>
                        <p className="text-primary font-semibold">{property.area} sqft</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {property.numberOfBeds && (
                        <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <Bed className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium">{t('bed-room')}</span>
                            </div>
                            <p className="text-primary font-semibold">{property.numberOfBeds}</p>
                        </div>
                    )}

                    {/*<div>*/}
                    {/*    <div className="text-muted-foreground mb-1 text-sm font-medium">Bathrooms</div>*/}
                    {/*    <p className="text-foreground font-semibold">{propertyData.bathrooms}</p>*/}
                    {/*</div>*/}

                    {/*<div>*/}
                    {/*    <div className="text-muted-foreground mb-1 text-sm font-medium">Parking Spaces</div>*/}
                    {/*    <p className="text-foreground font-semibold">{propertyData.parkingSpaces}</p>*/}
                    {/*</div>*/}

                    <div>
                        <div className="text-muted-foreground mb-1 text-sm font-medium">{t('city')}</div>
                        <p className="text-primary font-semibold">{property.cityName}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PropertyInfo;
