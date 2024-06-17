import { User } from "../types";

export const usePermission=()=>{
    const allowedRoles=['admin', 'manager', 'customer'];
    
    const _hasPermission=(user: User | null)=>{
        if(user){
            return allowedRoles.includes(user.role);
        }

        return false;
    };

    return {
        isAllowed:_hasPermission
    }
}