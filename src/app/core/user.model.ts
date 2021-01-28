export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    // gender: string;
    // nickname?: string;
    // DOB?: Date;
    phone?: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
    roles?: Roles;
}
