export type Credentials={
    email:string;
    password:string;
}

export interface Tenant{
    id:number;
    name:string;
    address:string;
}

export interface User{
    id:number;
    firstName: string;
    lastName: string;
    email:string;
    role:string;
    tenant?:Tenant;
}

export type CreateUserData = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    tenantId: number;
};

export type FieldData={
    name:string;
    value?:string
}

export type Category = {
    _id: string;
    name: string;
};