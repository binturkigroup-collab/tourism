import { Block } from "./Block";
import ProjectLink from "@/models/block/ProjectLink";
import File from "@/models/files/File";
import Lead from "@/models/lead/Lead";

class Property extends Block{
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
    brochure: File;
    qrFile: File;
    leads: Lead [];
    leadsCount: number;
    numberOfProjects: number;
    numberOfProperties: number;

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
                    propertyId = -1,
                    developerId = -1,
                    communityId = -1,
                    cityId = -1,
                    developerName = '',
                    communityName = '',
                    cityName = '',
                    features = '',
                    status = '',
                    price = 0,
                    area = 0,
                    numberOfBeds = 0,
                    isPropertyActive = false,
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
        this.propertyId = propertyId;
        this.developerId = developerId;
        this.communityId = communityId;
        this.cityId = cityId;
        this.developerName = developerName;
        this.communityName = communityName;
        this.cityName = cityName;
        this.features = features;
        this.price = price;
        this.status = status;
        this.area = area;
        this.numberOfBeds = numberOfBeds;
        this.isPropertyActive = isPropertyActive;
        this.brochure = {...brochure};
        this.qrFile = {...qrFile};
        this.leads = [...leads];
        this.leadsCount = leadsCount;
        this.numberOfProjects = numberOfProjects;
        this.numberOfProperties = numberOfProperties;
    }
}

export default Property;
