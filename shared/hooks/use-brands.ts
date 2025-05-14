import {useEffect, useState} from "react";
import { Api } from "../services/api-client";

interface Brand {
    id: string;
    name: string;
}

export const useBrands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const data = await Api.brands.getBrands();
                setBrands(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch brands'));
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    return { brands, loading, error };
};