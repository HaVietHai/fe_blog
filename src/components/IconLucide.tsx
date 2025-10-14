import * as Icons from "lucide-react";
import type { LucideProps } from 'lucide-react'
import type React from "react";
import type { IconName } from "../config/type";

export function IconLucide({ name, ...props }: { name: IconName;[key: string]: any }) {
    const Icon = Icons[name] as React.FC<LucideProps>;
    return Icon ? <Icon {...props} /> : null;
}