import React from 'react';
import {Container} from "typedi";
import {Card, CardContent, CardHeader, CardTitle} from "@/Pages/Site/components/ui/card";
import {Button} from "@/Pages/Site/components/ui/button";
import {Youtube} from "lucide-react";
import {useResourceContext} from "@/Providers/ResourceProvider/ResourceContext";
import ResourceService from "@/Services/BlockService/ResourceService";
import DownloadBrochure from "@/Providers/ResourceProvider/Components/DownloadBrochure";

// HERE, both projects and properties are shared with qrFile, brochure, and youtubeUrl
//These properties are added to IBrochure interface, then we make both ProjectProps and PropertyProps
//implement the new contract.
const ObjectResources: React.FC = () => {
    const blockService = Container.get(ResourceService);

    const {leadType, resources} = useResourceContext();
    const instanceType = leadType.type === "project" ? "projects" : "properties";
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-foreground">Resources</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                {/*<DownloadBrochure brochure={resources} instanceType={instanceType}/>*/}
                <DownloadBrochure></DownloadBrochure>
                <Button variant="outline" className="gap-2" asChild>
                    <a href={resources.youtubeUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                        <Youtube className="w-4 h-4" />
                        Watch Video
                    </a>
                </Button>
                {resources.qrFile && <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-md">
                    <img src={blockService.getResourceUrl(resources.qrFile.url, instanceType)} alt="QR Code" className="w-16 h-16"/>
                    <span className="text-sm text-muted-foreground">Scan for details</span>
                </div>}
            </CardContent>
        </Card>
    );
};

export default ObjectResources;
