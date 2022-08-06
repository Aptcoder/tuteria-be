export interface IUser {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    dateJoined: string
}

export interface IBooking {
    orderId: string,
    description: string,
    start: string,
    end: string,
    amount: number,
    users?: IUser[]
}