import React from 'react';
import PropertyProps from "@/Interfaces/Site/PropertyProps";
import {Head} from "@inertiajs/react";
import HeaderLayout from "@/Layouts/Site/HeaderLayout";
import {useToast} from "@/Pages/Site/hooks/use-toast";
import { Badge } from "@/Pages/Site/components/ui/badge";
import {MapPin} from "lucide-react";
import "reflect-metadata";
import PropertyGallery from "@/Pages/Site/Properties/PropertyDetails/PropertyGallery";
import PropertyInfo from "@/Pages/Site/Properties/PropertyDetails/PropertyInfo";
import LeadSection from "@/Pages/Site/components/LeadSection";
import ResourceContainer from "@/Providers/ResourceProvider/Components/ResourceContainer";

const PropertyDetails: React.FC<{property: PropertyProps}> = ({property}) => {
    const { toast } = useToast();
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        email: "",
        note: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.phone) {
            toast({
                title: "Required fields missing",
                description: "Please fill in Name and Phone number",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Success!",
            description: "Your inquiry has been submitted. We'll contact you soon.",
        });
        setFormData({ name: "", phone: "", email: "", note: "" });
    };
    return (
        <HeaderLayout>
            <Head title={`${property.title}`}></Head>

            <div className="min-h-screen bg-background">
                <header className="border-b border-border bg-background">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4 text-secondary" />
                                    <span>{property.communityName}, {property.cityName}</span>
                                </div>
                            </div>
                            <Badge className="bg-secondary text-primary-foreground text-lg px-4 py-2">
                                {property.status}
                            </Badge>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Gallery and Details */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Gallery */}
                            <PropertyGallery property={property}></PropertyGallery>

                            {/* Property Details */}
                            <PropertyInfo property={property}></PropertyInfo>

                            {/* Features */}
                            {/*<PropertyFeatures property={property}></PropertyFeatures>*/}
                            {/*Property Resources*/}
                            <ResourceContainer
                                resources={property}
                                leadType={{id: property.propertyId, propertyName: property.title, type: "property"}}></ResourceContainer>
                        </div>



                        {/* Right Column - Lead Form */}
                        <LeadSection leadType={{type: "property", id: property.propertyId, propertyName: property.title}}></LeadSection>
                    </div>
                </main>
            </div>
        </HeaderLayout>
    );
};

export default PropertyDetails;
