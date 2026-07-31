export interface RegisterInput {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    address: {
        city: string;
        street: string;
        country: string;
    };
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RefreshTokenInput {
    refreshToken: string;
}