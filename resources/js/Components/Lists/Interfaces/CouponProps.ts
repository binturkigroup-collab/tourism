import ListProps from "./ListProps";
import Coupon from "@/models/coupon/Coupon";

interface CouponProps extends ListProps {
    coupons: Coupon [];
    deleteCoupon: (id: number) => void;
}

export default CouponProps;

export interface CouponGridProps {
    id: number;
    code: string;
    amount: number;
    isPercent: boolean;
    isActive: boolean;
    valid: boolean;
}
