import {LeadType} from "@/Pages/Site/components/LeadSection";
import IBrochure from "@/Interfaces/Site/IBrochure";
import File from "@/models/files/File";
import React from "react";

type ResourceType = {
    leadType: LeadType;
    resources: IBrochure;
    // isBrochureDownloaded: boolean;
}

const initState: ResourceType = {
    leadType: {
        type: "project",
        id: 0,
        propertyName: ""
    },

    resources: {
        brochure: new File({}),
        title: "",
        youtubeUrl: "",
        qrFile: new File({})
    },

    // isBrochureDownloaded: false,
}

const ResourceContext = React.createContext<ResourceType>(initState);

const ResourceProvider: React.FC<React.PropsWithChildren<{value: ResourceType}>> = ({value, children}) => (
    <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>
);

const useResourceContext = () => {
    const context = React.useContext(ResourceContext);
    if (!context) {
        throw new Error('A context should be used inside the provider!');
    }
    return context;
}

export {useResourceContext, ResourceProvider};
