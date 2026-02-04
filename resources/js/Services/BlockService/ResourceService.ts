import {Service} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";

@Service()
class ResourceService extends BlockService{

    getBrochureUrl(url: string, type: "projects" | "properties") {
        return `${window.location.origin}/file/${type}/brochure/${url}`
    }
    getResourceUrl(url: string, type: "projects" | "properties") {
        return `${window.location.origin}/file/${type}/brochure/${url}`
    }
}

export default ResourceService;
