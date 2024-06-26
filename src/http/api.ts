import { Credentials, CreateUserData } from "../types";
import { api } from "./client";

export const login=(credentials: Credentials)=> api.post('auth/login', credentials);

export const self=()=> api.get('auth/self');

export const logout=()=> api.post('auth/logout');

export const getUsers=(queryString:string)=> api.get(`users/all?${queryString}`);

export const getTenants=()=> api.get('tenants/all');

export const createUser = (user: CreateUserData) => api.post('/users', user);

export const updateUser=(user: CreateUserData, id: number) => api.patch(`/users/${id}`, user);

