class ProjectLink {
    linkId: number;
    github: string;
    preview: string;

    constructor({
                    linkId = -1,
                    github = '',
                    preview = ''
    }) {
        this.linkId = linkId;
        this.github = github;
        this.preview = preview;
    }
}

export default ProjectLink;
