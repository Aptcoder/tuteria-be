import { IUser } from "../interfaces/entities.interfaces"

export interface CreateBookingDto {
    orderId: string,
    description: string,
    start: string,
    end: string,
    amount: number
    users: number[] | IUser[]
}


export interface BookingData extends CreateBookingDto {
    users: IUser[]
}