import type { IconName } from "../config/type";

export interface MenuItem{
    title: string;
    to: string;
    icon: IconName;
}

export interface HAVE_TROUBLE{
    message: string;
}