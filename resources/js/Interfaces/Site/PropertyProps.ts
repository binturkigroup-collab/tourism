import File from "@/models/files/File";
import BlockProps from "@/Interfaces/Site/BlockProps";
import IBrochure from "@/Interfaces/Site/IBrochure";

interface PropertyProps extends BlockProps, IBrochure {
    propertyId: number;
    developerId: number;
    communityId: number;
    cityId: number;
    developerName: string;
    communityName: string;
    cityName: string;
    features: string;
    status: string;
    price: number;
    area: number;
    numberOfBeds: number;
    isPropertyActive: boolean;
    // ==========These props are moved to IBrochure==========//
    // brochure: File;
    // qrFile: File;
    // youtubeUrl: string;
}

export default PropertyProps;
