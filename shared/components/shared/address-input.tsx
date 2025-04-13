'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void;
}

export function AddressInput({ onChange } : Props) {
    return (
        <AddressSuggestions
            token={process.env.NEXT_PUBLIC_DADATA_API_KEY as string}
            onChange={(data) => onChange?.(data?.value)}
            delay={300}
            count={7}
        />
    );
}