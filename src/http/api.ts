import { Credentials, CreateUserData } from "../types";
import { api } from "./client";

const auth_service='/api/auth';
const catalog_service='api/catalog'

// auth service
export const login=(credentials: Credentials)=> api.post(`${auth_service}/auth/login`, credentials);

export const self=()=> api.get(`${auth_service}/auth/self`);

export const logout=()=> api.post(`${auth_service}/auth/logout`);

export const getUsers=(queryString:string)=> api.get(`${auth_service}/users/all?${queryString}`);

export const getTenants=()=> api.get(`${auth_service}/tenants/all`);

export const createUser = (user: CreateUserData) => api.post(`${auth_service}/users`, user);

export const updateUser=(user: CreateUserData, id: number) => api.patch(`${auth_service}/users/${id}`, user);

// catalog service
export const getCategories = () => api.get(`${catalog_service}/categories`);

export const getProducts = (queryParam: string) =>
    api.get(`${catalog_service}/products?${queryParam}`);

export const createProduct = (product: FormData) =>
    api.post(`${catalog_service}/products`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

export const getCategory = (id: string) => api.get(`${catalog_service}/categories/${id}`);

export const updateProduct = (product: FormData, id: string) => {
    return api.put(`${catalog_service}/products/${id}`, product, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};