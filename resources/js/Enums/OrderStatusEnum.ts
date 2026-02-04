enum OrderStatusEnum {
    pending = 'Pending',
    processing = 'Processing',
    onHold = 'On Hold',
    completed = 'Completed',
    cancelled = 'Cancelled',
    refunded = 'Refunded',
    failed = 'Failed',
}

export type OrderStatus = keyof typeof OrderStatusEnum;

export default OrderStatusEnum;
