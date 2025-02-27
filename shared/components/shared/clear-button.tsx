import { X } from 'lucide-react';
import React from 'react';

interface Props {
    className?: string;
    onClick?: VoidFunction;
}

export function ClearButton({ onClick, className = '' } : Props) {
    return (
        <button
            onClick={onClick}
            className={`clear-button ${className}`}>
            <X className="icon-x" />
        </button>
    );
}