import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import Offer from "@/models/offer/Offer";
import IGeneralResponse from "@/Interfaces/IGeneralResponse";
import OfferTableProps from "@/Interfaces/DataTable/OfferTable";
import {OfferGridProps} from "@/Components/Lists/Interfaces/OfferProps";

@Service()
class OfferService {
    mapOffersGrid = (offers: Offer []): OfferGridProps [] => {
        return offers.map(offer => (
            {
                id: offer.id,
                name: offer.name,
                amount: offer.amount,
                isActive: offer.isActive,
                isPercent: offer.isPercent,
                category: offer.type,
                valid: offer.valid,
            }
        ))
    }

    storeOffer = (formData: FormData): Promise<AxiosResponse<Offer>> => {
        return axios.post(
            '/admin/marketing/offer',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }

    updateOffer = (formData: FormData, id: number): Promise<AxiosResponse<Offer>> => {
        return axios.post(
            '/admin/marketing/offer/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }

    deleteOffer = (id: number): Promise<AxiosResponse<IGeneralResponse>> => {
        return axios.post(
            '/admin/marketing/offer/' + id + '?_method=DELETE',
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }

    getOfferRows = (offers: Offer[]): OfferTableProps[] => {
        let rows: OfferTableProps [] = [];
        offers.map(offer => {
            rows = [...rows, {
                id: offer.id,
                name: '',
                category: offer.type,
                isActive: offer.isActive,
                isPercent: offer.isPercent,
                amount: offer.amount,
                edit: 'Edit',
                delete: 'Delete',
            }];
        })
        return rows;
    }

    activateOffer = (formData: FormData, id: number): Promise<AxiosResponse<Offer>> => {
        return axios.post(
            '/admin/marketing/offer/activate/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }
}

export default OfferService;
