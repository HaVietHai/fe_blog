import React, { useState } from "react";
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
    const [show, setShow] = useState<boolean>(false);
    const handleShowPass = () =>{
        setShow(!show);
    }
    return (
        <Text
            label={label}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            icon={icon}
            type={show ? "text" : "password"}
            error={error}
            required={required}
            iconRight={show ? "Eye" : "EyeClosed"}
            onShowPass={handleShowPass}
        />
    );
};

export default Password;