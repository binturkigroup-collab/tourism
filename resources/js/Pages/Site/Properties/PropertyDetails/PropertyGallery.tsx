import React from 'react';
import PropertyProps from "@/Interfaces/Site/PropertyProps";
import { Card, CardContent} from "@/Pages/Site/components/ui/card";
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import "reflect-metadata";

const PropertyGallery: React.FC<{property: PropertyProps}> = ({property}) => {
    const blockService = Container.get(BlockService);
    const [selectedImage, setSelectedImage] = React.useState<string>(property.images[0].url);
    return (
        <Card className={'bg-background'}>
            <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                        src={blockService.getImageUrl(selectedImage)}
                        alt={`Gallery ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="grid grid-cols-5 gap-2 p-4">
                    {property.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img.url)}
                            className={`aspect-video rounded-md overflow-hidden border-2 transition-all ${
                                selectedImage === img.url ? "border-secondary" : "border-border"
                            }`}
                        >
                            <img src={blockService.getImageUrl(img.url)} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PropertyGallery;
