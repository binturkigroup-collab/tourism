import File from "@/models/files/File";
import BlockProps from "@/Interfaces/Site/BlockProps";
import IBrochure from "@/Interfaces/Site/IBrochure";

interface ProjectProps extends BlockProps, IBrochure{
    projectId: number;
    developerId: number;
    communityId: number;
    cityId: number;
    developerName: string;
    communityName: string;
    cityName: string;
    lunchDate: string;
    lunchPrice: number;
    status: string;
    type: string;
    downPayment: number;
    constructionPaymentRate: number;
    handoverPaymentRate: number;
    paymentPlanType: string;
    quarter: string;
    handoverDate: string;
    isProjectActive: boolean;
    // ==========These props are moved to IBrochure==========//
    // brochure: File;
    // qrFile: File;
    // youtubeUrl: string;
}

export default ProjectProps;
