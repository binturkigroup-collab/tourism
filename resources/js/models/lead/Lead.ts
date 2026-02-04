export default class Lead {
    id: number;
    referenceId: number;
    referenceName: string;
    referenceType: string;
    agentId: number;
    agentName: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    action: string;


    constructor({
                    id = -1,
                    referenceId = -1,
                    referenceName = '',
                    referenceType = '',
                    agentId = -1,
                    agentName = '',
                    name = '',
                    email = '',
                    phone = '',
                    message = '',
        action = '',
                }) {
        this.id = id;
        this.referenceId = referenceId;
        this.referenceName = referenceName;
        this.referenceType = referenceType;
        this.agentId = agentId;
        this.agentName = agentName;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.message = message;
        this.action = action;
    }
}
