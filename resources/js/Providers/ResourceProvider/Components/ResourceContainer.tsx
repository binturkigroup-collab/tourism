import React from 'react';
import {ResourceProvider} from "@/Providers/ResourceProvider/ResourceContext";
import {LeadType} from "@/Pages/Site/components/LeadSection";
import IBrochure from "@/Interfaces/Site/IBrochure";
import ObjectResources from "@/Providers/ResourceProvider/Components/ObjectResources";

const ResourceContainer: React.FC<{leadType: LeadType, resources: IBrochure}> = ({resources, leadType}) => {
    return (
        <ResourceProvider value={{leadType, resources}}>
            <ObjectResources />
        </ResourceProvider>
    );
};

export default ResourceContainer;
