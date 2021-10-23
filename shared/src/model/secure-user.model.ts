export interface SecureUserModel {
    email: string;
    hash: string;
    salt: string;
    generateJWT: () => string;
    validatePassword: (password: string) => boolean;
}
