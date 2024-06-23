import { Credentials, CreateUserData } from "../types";
import { api } from "./client";

export const login=(credentials: Credentials)=> api.post('auth/login', credentials);

export const self=()=> api.get('auth/self');

export const logout=()=> api.post('auth/logout');

export const getUsers=()=> api.get('users/all');

export const getTenants=()=> api.get('tenants/all');

export const createUser = (user: CreateUserData) => api.post('/users', user);


