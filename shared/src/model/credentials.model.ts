import {UserRole} from "./user-role.model";

export interface CredentialsModel {
    firstName: string;
    token: string;
    role: UserRole;
    id: string;
}
