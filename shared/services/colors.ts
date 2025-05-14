import {Color} from "@/@types/prisma";
import { api } from "./instance";

export const getColors = async () => {
    return await api.get<Color[]>('products/colors')
}