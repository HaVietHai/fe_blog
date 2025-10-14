import React from "react";
import Text  from "./Text";
import type { IconName } from '../../config/type';

interface PasswordPros {
    value?: string;
    name: string;
    label?: string;
    placeholder?: string;
    error?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const Password: React.FC<PasswordPros> = ({ value, onChange, placeholder, name, label ,error, required = false}) => {
    let icon: IconName = "Lock";
    return (
        <Text
            label={label}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            icon={icon}
            type="password"
            error={error}
            required={required}
        />
    );
};

export default Password;