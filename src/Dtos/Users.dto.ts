export interface UsersDto {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    NIC: string;
    address: string;
    password: string
}

export interface tokenDto {
    userId: string;
    jti: string;
    type: string
}