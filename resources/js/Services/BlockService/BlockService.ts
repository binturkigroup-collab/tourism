import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import CategoryTableProps from "@/Interfaces/DataTable/CategoryTableProps";
import {Block} from "@/models/block/Block";
import BlockTableProps from "@/Interfaces/DataTable/BlockTableProps";
import {BlockTranslation} from "@/models/block/BlockTranslation";
import {BlockGridProps} from "@/Components/Lists/Interfaces/BlockProps";
import Property from "@/models/block/Property";
import Project from "@/models/block/Project";
import PropertyProps from "@/Interfaces/Site/PropertyProps";
import ProjectProps from "@/Interfaces/Site/ProjectProps";

type Translations = {
    [code: string] : {
        name: string,
        description: string,
    }[]
}

@Service()
class BlockService {
    language = 'en';

    mapBlocksGrid = (blocks: Block []): BlockGridProps [] => {
        return blocks.map(block => ({
            id: block.id,
            avatar: this.getBlockImage(block),
            name: this.getBlockName(block),
            parent: this.getParentBlock(block.parentId, blocks),
            isActive: block.isActive,
            createdAt: block.createdAt,
            category: block.category,
        }))
    }

    getParentBlock = (parentId: number | null, blocks: Block[]) => {
        let parentName = '';
        if (parentId !== null) {
            const parentBlock = blocks.find(cat => cat.id === parentId) || null;
            if (parentBlock !== null) {
                parentName = parentBlock.translations.find(trans => trans.language === this.language)?.name || '';
            }
        }
        return parentName;
    }

    getBlockName = (block: Block) => {
        return block.translations.find(trans => trans.language === this.language)?.name || '';
    }

    getBlockNameById = (blockId: number | null, blocks: Block []) => {
        const block = blocks.find(block => block.id === blockId);
        if (!block) { return ''};
        return this.getBlockName(block);
    }

    getBlockRows = (blocks: Block[]): BlockTableProps[] => {
        let rows: BlockTableProps [] = [];
        blocks.map(block => {
            rows = [...rows, {
                id: block.id,
                name: this.getBlockName(block),
                parent: this.getParentBlock(block.parentId, blocks),
                isActive: block.isActive,
                edit: 'Edit',
                delete: 'Delete',
                createdAt: block.createdAt,
                image: this.getBlockImage(block),
            }];
        })
        return rows;
    }

    getBlockImage = (block: Block) => {
        return `${window.location.origin}/file/blocks/${block.images[0]?.url}`
    }

    getImageUrl = (url: string) => {
        return `${window.location.origin}/file/blocks/${url}`
    }

    getTranslationsDetails = (translations: BlockTranslation []) => {
        const transDetails: Translations = {};
        translations.map(trans => {
            Object.assign(transDetails, {
                [trans.language]: {
                    name: trans.name,
                    description: trans.description,
                    brief: trans.brief,
                }
            })
        });
        return transDetails;
    }

    storeBlock = (formData: FormData) => {
        return axios.post<{status: string, message: string, block: Block}>(
            '/admin/block',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    updateBlock = (formData: FormData, id: number) : Promise<AxiosResponse<Block>> => {
        return axios.post(
            '/admin/block/translations/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    blockActivation = (formData: FormData, id: number): Promise<AxiosResponse<Block>> => {
        return axios.post(
            '/admin/block/activation/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    addImage = (formData: FormData, id: number): Promise<AxiosResponse<Block>> => {
        return axios.post(
            '/admin/block/upload/file/' + id,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    uploadImage = (formData: FormData, id: number) : Promise<AxiosResponse<Block>> => {
        return axios.post(
            '/admin/block/upload/file/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    deleteImage = (formData: FormData, id: number) : Promise<AxiosResponse<Block>> => {
        return axios.post(
            '/admin/block/upload/file/' + id + '?_method=DELETE',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    deleteBlock = (id: number, formData?: FormData) => {
        return axios.post(
            '/admin/block/' + id + '?_method=DELETE',
            formData ?? {},
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }

        )
    }

    reorder = (formData: FormData) => {
        return axios.post(
            '/admin/block/reorder',
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        )
    }

    getActiveBlocks = (category: string) => {
        return axios.get<Block []>(
            `/api/get-blocks/${category}`,
        )
    }

    getSVGImage = (url: string) => {
        return axios.get<string>(`/file/blocks/${url}`);
    }

    getProperties = (lang: string, query: string) => {
        return axios.get<PropertyProps []>(
            `/${lang}/api/properties${query}`
        )
    }

    getProjects = (lang: string, query: string) => {
        return axios.get<ProjectProps []>(
            `/${lang}/api/projects${query}`
        )
    }
}

export default BlockService;
