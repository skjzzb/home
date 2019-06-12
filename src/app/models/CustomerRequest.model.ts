import { OrderData } from './Order.model';

export interface CustomerRequest{
    customerEmail: string;
    date: string;
    driverEmail: string;
    dropOffLocation: string;
    order: OrderData[];
    pickupLocation: string;
    status: number;
    time: string;
    totalPrice: number;
    totalWeight: number;
    pickupDate: string;
    pickupTime: string;
}