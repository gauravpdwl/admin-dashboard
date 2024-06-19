export type Credentials={
    email:string;
    password:string;
}

interface Tenant{
    id:number;
    name:string;
    address:string;
}

export interface User{
    id:number;
    firstName: string;
    lastname: string;
    email:string;
    role:string;
    tenant?:Tenant;
}
