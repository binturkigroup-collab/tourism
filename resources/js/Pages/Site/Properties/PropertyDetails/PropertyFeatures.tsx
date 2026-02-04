import React from 'react';
import PropertyProps from "@/Interfaces/Site/PropertyProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import "reflect-metadata";

const PropertyFeatures: React.FC<{property: PropertyProps}> = ({property}) => {
    return (
        <Card className={'bg-background'}>
            <CardHeader>
                <CardTitle className="text-foreground">Features & Amenities</CardTitle>
            </CardHeader>
            {/*<CardContent>*/}
            {/*    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">*/}
            {/*        {propertyData.features.map((feature, idx) => (*/}
            {/*            <div key={idx} className="flex items-center gap-2">*/}
            {/*                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />*/}
            {/*                <span className="text-foreground">{feature}</span>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</CardContent>*/}
        </Card>
    );
};

export default PropertyFeatures;
