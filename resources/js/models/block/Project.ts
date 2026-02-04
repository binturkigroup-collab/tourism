import { Block } from "./Block";
import ProjectLink from "@/models/block/ProjectLink";
import File from "@/models/files/File";
import Lead from "@/models/lead/Lead";

class Project extends Block{
    projectId: number;
    developerId: number;
    communityId: number;
    cityId: number;
    developerName: string;
    communityName: string;
    cityName: string;
    lunchDate: string;
    lunchPrice: string;
    status: string;
    type: string;
    downPayment: number;
    youtubeUrl: string;
    constructionPaymentRate: number;
    handoverPaymentRate: number;
    paymentPlanType: string;
    quarter: string;
    handoverDate: string;
    isProjectActive: boolean;
    brochure: File;
    qrFile: File;
    leads: Lead [];
    leadsCount: number;
    numberOfProjects: number;
    numberOfProperties: number

    constructor({

                    id = -1,
                    categoryId = -1,
                    parentId = -1,
                    category = '',
                    images = ([] as File []),
                    url = '',
                    file = '',
                    order = -1,
                    isActive = false,
                    startDate = '',
                    endDate = '',
                    createdAt = '',
                    translations = [],
                    files = [],
                    projectId = -1,
                    developerId = -1,
                    communityId = -1,
                    cityId = -1,
                    developerName = '',
                    communityName = '',
                    cityName = '',
                    lunchDate = '',
                    lunchPrice = '',
                    status = '',
                    type = '',
                    downPayment = 0,
                    youtubeUrl = '',
                    isProjectActive = false,
                    constructionPaymentRate = 0,
                    handoverPaymentRate = 0,
                    paymentPlanType = '',
                    quarter = '',
                    handoverDate = '',
                    brochure = new File({}),
                    qrFile = new File({}),
                    leads = [] as Lead [],
                    leadsCount = 0,
                    numberOfProjects = 0,
                    numberOfProperties = 0,
                }) {
        super({
            id,
            categoryId,
            parentId,
            category,
            images,
            url,
            file,
            order,
            isActive,
            startDate,
            endDate,
            createdAt,
            translations,
            files,
        });
        this.projectId = projectId;
        this.developerId = developerId;
        this.communityId = communityId;
        this.cityId = cityId;
        this.developerName = developerName;
        this.communityName = communityName;
        this.cityName = cityName;
        this.lunchDate = lunchDate;
        this.lunchPrice = lunchPrice;
        this.status = status;
        this.type = type;
        this.downPayment = downPayment;
        this.youtubeUrl = youtubeUrl;
        this.handoverPaymentRate = handoverPaymentRate;
        this.constructionPaymentRate = constructionPaymentRate;
        this.paymentPlanType = paymentPlanType;
        this.quarter = quarter;
        this.handoverDate = handoverDate;
        this.isProjectActive = isProjectActive;
        this.brochure = {...brochure};
        this.qrFile = {...qrFile};
        this.leads = [...leads];
        this.leadsCount = leadsCount;
        this.numberOfProjects = numberOfProjects;
        this.numberOfProperties = numberOfProperties;
    }
}

export default Project;
