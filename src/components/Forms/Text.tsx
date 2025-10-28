import React, { useState } from "react";
import { IconLucide } from "../IconLucide";
import type { IconName } from '../../config/type';

interface TextProps {
    label?: string;
    value?: string;
    name: string;
    placeholder?: string;
    type?: string;
    icon?: IconName;
    iconRight?: IconName
    isSecurity?: boolean;
    error?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onShowPass?: () => void
    required?: boolean;
    margin?: string
}

const Text: React.FC<TextProps> = ({ label, name, placeholder, type, icon, iconRight, value, onChange, onShowPass, error, required = false, margin = "" }) => {
    let textPaddingLeft = icon ? "pl-10" : "pl-3";
    return (
        <div className={`text-wrapper ${margin}`}>
            {
                label && <label className="block text-gray-700 text-sm mb-1" htmlFor={name}>
                    {label}
                    {required && <span className="text-red-600"> *</span>}
                </label>
            }
            {
                type &&
                (
                    <div className="relative">
                        {
                            icon && (
                                <span className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <IconLucide name={icon} className="h-5 w-5 text-gray-400" />
                                </span>
                            )
                        }
                        <input
                            className={`appearance-none text-black block w-full ${textPaddingLeft} pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm transition duration-150`}
                            type={!type ? "text" : type}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                        />
                        {
                            iconRight && (
                                <span
                                    onClick={onShowPass}
                                    className="absolute inset-y-0 right-2 pl-3 flex items-center hover:cursor-pointer"
                                >
                                    <IconLucide name={iconRight} className="w-5 h-5 text-gray-400" />
                                </span>
                            )
                        }
                    </div>
                )
            }
            {
                error && (
                    <span className="text-red-600 text-sm">{error}</span>
                )
            }
        </div>
    );
};
export default Text;