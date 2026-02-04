import React from 'react';
import {Button} from "@/Pages/Site/components/ui/button";
import {Container} from "typedi";
import ProjectService from "@/Services/BlockService/ProjectService";
import "reflect-metadata"
import { Download, Sparkles } from "lucide-react";
import {useResourceContext} from "@/Providers/ResourceProvider/ResourceContext";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Pages/Site/components/ui/dialog";
import LeadSection from "@/Pages/Site/components/LeadSection";

const DownloadBrochure: React.FC = () => {
    const blockService = Container.get(ProjectService);

    const {resources, leadType} = useResourceContext();

    const instanceType = leadType.type === "project" ? "projects" : "properties";
    const downloadResource = () => {
        // e.preventDefault();
        // //Send it to GA4:
        // console.log(leadType.propertyName, 1);
        window.gtag?.('event', 'brochure_download', {
            project_name: leadType.propertyName,
        });
        //Send Email from here

        //Download the brochure:
        window.location.href = blockService.getBrochureUrl(resources.brochure.url, instanceType);
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="lg">
                        <Download className="w-4 h-4"/>
                        Download Brochure
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                    <LeadSection
                        leadType={{...leadType, isBrochureDownloaded: true}}
                        callback={downloadResource}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DownloadBrochure;
