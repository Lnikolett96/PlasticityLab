export interface user {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    created_at: Date;
}

export interface userDTO {
    username: string;
    email: string;
    password: string;
}

export interface userLoginData {
    email: string;
    password: string;
}