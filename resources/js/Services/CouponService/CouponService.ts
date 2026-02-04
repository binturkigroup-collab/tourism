import {Service} from "typedi";
import axios, {AxiosResponse} from "axios";
import Coupon from "@/models/coupon/Coupon";
import IGeneralResponse from "@/Interfaces/IGeneralResponse";
import CouponTableProps from "@/Interfaces/DataTable/CouponTable";
import {CouponGridProps} from "@/Components/Lists/Interfaces/CouponProps";

@Service()
class CouponService {
    mapCouponsGrid = (coupons: Coupon []): CouponGridProps [] => {
        return coupons.map(coupon => (
            {
                id: coupon.id,
                code: coupon.code,
                amount: coupon.amount,
                isPercent: coupon.isPercent,
                isActive: coupon.isActive,
                valid: coupon.valid,
            }
        ))
    }

    storeCoupon = (formData: FormData): Promise<AxiosResponse<Coupon>> => {
        return axios.post(
            '/admin/marketing/coupon',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }

    updateCoupon = (formData: FormData, id: number): Promise<AxiosResponse<Coupon>> => {
        return axios.post(
            '/admin/marketing/coupon/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }

    deleteCoupon = (id: number): Promise<AxiosResponse<IGeneralResponse>> => {
        return axios.post(
            '/admin/marketing/coupon/' + id + '?_method=DELETE',
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }

    getCouponRows = (coupons: Coupon[]): CouponTableProps[] => {
        let rows: CouponTableProps [] = [];
        coupons.map(coupon => {
            rows = [...rows, {
                id: coupon.id,
                code: coupon.code,
                amount: coupon.amount,
                isPercent: coupon.isPercent,
                isActive: coupon.isActive,
                edit: 'Edit',
                delete: 'Delete',
            }];
        })
        return rows;
    }

    activateCoupon = (formData: FormData, id: number): Promise<AxiosResponse<Coupon>> => {
        return axios.post(
            '/admin/marketing/coupon/activate/' + id + '?_method=PATCH',
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
    }

    checkCoupon = (formData: FormData): Promise<AxiosResponse<Coupon | null>> => {
        return axios.post(
            '/marketing/coupon/check',
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                }
            }
            );
    }
}

export default CouponService;
