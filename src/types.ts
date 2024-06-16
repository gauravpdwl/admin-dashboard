export type Credentials={
    email:string;
    password:string;
}

export interface User{
    id:number;
    firstName: string;
    lastname: string;
    email:string;
    role:string;
}
