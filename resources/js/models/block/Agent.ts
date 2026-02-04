import { Block } from "./Block";
import File from "@/models/files/File";

class Agent extends Block{
    phone: string;
    email: string;

    constructor({
                    id = -1,
                    categoryId = -1,
                    parentId = -1,
                    category = '',
                    // name = '',
                    // description = '',
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
                    email = '',
                    phone = '',
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
            files
        });
        this.email = email;
        this.phone = phone;
    }
}

export default Agent;
