export default class MenuLink {
    masterName: string;
    name: string;
    url: string;
    slug: string;
    target: string;
    children: MenuLink [];
    image: string;
    type: string;
    constructor({
                    masterName = '',
                    name = '',
                    url = '',
                    slug = '',
                    target = '',
                    children: children = [],
                    image = '',
                    type = '',
                }) {
        this.masterName = masterName;
        this.name = name;
        this.url = url;
        this.slug = slug;
        this.target = target;
        this.children = [...children];
        this.image = image;
        this.type = type;
    }
}
