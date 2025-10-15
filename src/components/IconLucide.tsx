import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type React from "react";
import type { IconName } from "../config/type";

export function IconLucide({ name, ...props }: { name: IconName; [key: string]: any }) {
  const IconComponent = (Icons as Record<string, React.FC<LucideProps>>)[name];

  if (!IconComponent) {
    console.warn(`[IconLucide] Icon "${name}" not found in lucide-react.`);
    return <span className="text-red-500 text-xs">⚠</span>; // fallback nhỏ để debug
  }

  return <IconComponent {...props} />;
}
