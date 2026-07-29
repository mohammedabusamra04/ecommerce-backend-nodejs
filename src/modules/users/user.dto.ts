export interface CreateUserInput {
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

export interface UpdateUserInput {
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: {
        city?: string;
        street?: string;
        country?: string;
    };
}