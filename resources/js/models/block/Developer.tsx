import {Block} from "@/models/block/Block";
import File from "@/models/files/File";
import Lead from "@/models/lead/Lead";

class Developer extends Block {
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
        this.numberOfProjects = numberOfProjects;
        this.numberOfProperties = numberOfProperties;
    }
}

export default Developer;
