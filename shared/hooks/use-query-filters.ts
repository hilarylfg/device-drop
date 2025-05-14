import React from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
    const isMounted = React.useRef(false);
    const router = useRouter();

    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.prices,
                availability: Array.from(filters.availability),
                discount: Array.from(filters.discount),
                colors: Array.from(filters.colors),
                brands: Array.from(filters.brands),
            };

            Object.keys(params).forEach((key) => {
                const value = params[key as keyof typeof params];
                if (Array.isArray(value) && value.length === 0) {
                    delete params[key as keyof typeof params];
                }
                if (value === undefined) {
                    delete params[key as keyof typeof params];
                }
            });

            const query = qs.stringify(params, {
                arrayFormat: 'comma',
            });

            router.push(`?${query}`, {
                scroll: false,
            });
        }

        isMounted.current = true;
    }, [filters, router]);
};