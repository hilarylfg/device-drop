import {api} from "@/shared/services/instance";

interface Brand {
    id: string;
    name: string;
}

export const getBrands = async () => {
    return await api.get<Brand[]>('products/brands');
}