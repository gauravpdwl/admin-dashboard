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

export type CreateTenantData = {
    name: string;
    address: string;
};

export type FieldData={
    name:string;
    value?:string
}

export interface PriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'aditional';
        availableOptions: string[];
    };
}

export interface Attribute {
    name: string;
    widgetType: 'switch' | 'radio';
    defaultValue: string;
    availableOptions: string[];
}

export type ProductAttribute = {
    name: string;
    value: string | boolean;
};

export type Category = {
    _id: string;
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
};

export type Product = {
    _id: string;
    name: string;
    image: string;
    description: string;
    category: Category;
    priceConfiguration: PriceConfiguration;
    attributes: ProductAttribute[];
    isPublish: boolean;
    createdAt: string;
};

export type ImageField = { file: File };
export type CreateProductData = Product & { image: ImageField };

