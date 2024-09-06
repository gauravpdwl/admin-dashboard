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

export enum OrderStatus {
    RECEIVED = 'received',
    CONFIRMED = 'confirmed',
    PREPARED = 'prepared',
    // todo: fix out_for_deliver(y*) typo in order status
    OUT_FOR_DELIVERY = 'out_for_deliver',
    DELIVERED = 'delivered',
}

export enum PaymentStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed',
}

export enum PaymentMode {
    CARD = 'card',
    CASH = 'cash',
}

export type Topping = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
}

export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
}
export interface Order {
    _id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    cart: CartItem[];
    customerId: Customer;
    total: number;
    discount: number;
    taxes: number;
    deliveryCharges: number;
    address: string;
    tenantId: string;
    comment?: string;
    paymentMode: PaymentMode;
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentId?: string;
    createdAt: string;
}