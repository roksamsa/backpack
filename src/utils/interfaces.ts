import { ISODateString } from "next-auth";

export interface Credentials {
    email: string;
    password: string;
}

export interface CustomToken {
    id: number;
}

export interface ModalData {
    data: any;
    isVisible: boolean;
    type: string;
}

export interface MenuItem {
    iconName: string;
    id: number;
    link: string | null;
    name: string;
}

export interface UserSchemaStructure {
    id: string;
    userId: string;
    schema: Category[];
}

export interface Category {
    id: string;
    children?: Category[];
    items?: { id: string; }[];
    name: string;
    link: string;
    iconName?: string;
}
export interface CustomSession {
    user?: {
        id?: any | null;
        name?: string | null;
        lastname?: any | null;
        email?: string | null;
        image?: string | null;
    };
    expires: ISODateString;
}
export interface CustomUser {
    id: string;
    name?: string | null;
    lastname?: string | null;
    email?: string | null;
}
