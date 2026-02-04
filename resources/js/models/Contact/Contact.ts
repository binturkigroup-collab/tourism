class Contact {
    id: number;
    agentId: number;
    agentName: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    type: string;
    createdAt: string;
    action: string;

    constructor({
        id = -1,
        agentId = -1,
        agentName = '',
        name = '',
        phone = '',
        email = '',
        message = '',
        type = '',
        createdAt = '',
        action = '',
    }) {
        this.id = id;
        this.agentId = agentId;
        this.agentName = agentName;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.message = message;
        this.type = type;
        this.createdAt = createdAt;
        this.action = action;
    }
}

export default Contact;
