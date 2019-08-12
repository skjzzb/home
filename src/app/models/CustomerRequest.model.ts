import { OrderData } from './Order.model';

export interface CustomerRequest{
    currentTime: string;
    customerEmail: string;
    orderPlacedDate: string;
    driverEmail: string;
    dropOffLocation: string;
    order: OrderData[];
    pickupLocation: string;
    status: number;
    orderPlacedTime: string;
    totalPrice: number;
    totalItems: number;
    scheduledDate: string;
}