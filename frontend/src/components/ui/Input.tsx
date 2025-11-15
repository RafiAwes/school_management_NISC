import React from "react";
import {LucideIcon} from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string;
    error?: string;
    icon?: LucideIcon;
    rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    icon: Icon,
    rightIcon,
    className='',
    ...props
}) => {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                )}
                <input className={`text-gray-950 w-full ${Icon ? 'pl-10' : 'pl-4'} ${rightIcon ? 'pr-12' : 'pr-4'} py-3 border ${error ? 'border-red-500':'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition ${className}`} {...props}/>
                {rightIcon && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {rightIcon}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};