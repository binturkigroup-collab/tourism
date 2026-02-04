import React from 'react';
import {Box, Typography} from "@mui/material";
import {Container as ServiceContainer} from "typedi";
import "reflect-metadata";
import CommonService from "@/Services/CommonService/CommonService";
import {useAppSelector, useAppDispatch} from "@/Redux/Store/hook";
import OrderData from "@/models/order/OrderData";

const PriceInfo: React.FC<{order: OrderData}> = ({order}) => {
    const commonService = ServiceContainer.get(CommonService);
    // const coupon = useAppSelector(state => state.coupon);
    // const [discount, setDiscount] = React.useState<number>(0);
    // React.useMemo(() => {
    //     setDiscount(coupon.isPercent ? totalPrice * coupon.amount / 100 : coupon.amount);
    // }, [coupon]);
    const discount = React.useCallback(() => {
        if (order.discount === null) return 0;
        else {
            if (order.discount.isPercent) {
                return order.totalPrice * order.discount.amount / 100;
            } else return order.discount.amount;
        }
    }, [order]);

    const discountAmount = React.useCallback(() => {
        if (order.discount === null) return '0 %';
        else {
            if (order.discount.isPercent) {
                return order.discount.amount + '%';
            } else return commonService.currencyFormat(order.discount.amount);
        }
    }, [order]);
    return (
        <Box className="w-full">
            <Box className="flex justify-between items-center">
                <Typography component="h5" variant="body1" sx={{width: 100, fontWeight: 700}}>Net Price</Typography>
                <Typography component="p" variant="body1" className=" text-start basis-[200px]" >
                    {commonService.currencyFormat(order.totalPrice)}
                </Typography>
            </Box>

            <Box className="flex justify-between items-center">
                <Typography component="h5" variant="body1" sx={{width: 100, fontWeight: 700}}>Discount</Typography>
                <Typography component="p" variant="body1" className="text-start basis-[200px]" >
                    {commonService.currencyFormat(discount())}
                </Typography>
            </Box>

            <Box className="flex justify-between items-center">
                <Typography component="h5" variant="body1" sx={{width: 100, fontWeight: 700}}>Total</Typography>
                <Typography component="p" variant="body1" className="text-start basis-[200px]" >
                    {commonService.currencyFormat(order.totalPrice - discount())}
                </Typography>
            </Box>
        </Box>
    );
};

export default PriceInfo;
