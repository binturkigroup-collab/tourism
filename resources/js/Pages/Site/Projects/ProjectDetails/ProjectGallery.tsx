import React from 'react';
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import {Card, CardContent, CardHeader, CardTitle} from "@/Pages/Site/components/ui/card";
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";

const ProjectGallery: React.FC<{project: ProjectProps}> = ({project}) => {
    const blockService = Container.get(BlockService);
    const [selectedImage, setSelectedImage] = React.useState<string>(project.images[0].url);
    return (
        <Card className="bg-background">
            <CardContent className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                        src={blockService.getImageUrl(selectedImage)}
                        alt={`Gallery ${selectedImage + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="grid grid-cols-5 gap-2 p-4">
                    {project.images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img.url)}
                            className={`aspect-video rounded-md overflow-hidden border-2 transition-all ${
                                selectedImage === img.url ? "border-primary" : "border-border"
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

export default ProjectGallery;
