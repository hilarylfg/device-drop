import { Color } from "@/@types/prisma";
import { useEffect, useState } from "react";
import { Api } from "../services/api-client";

export const useColors = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                setLoading(true);
                const data = await Api.colors.getColors();
                setColors(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch colors'));
            } finally {
                setLoading(false);
            }
        };

        fetchColors();
    }, []);

    return { colors, loading, error };
};