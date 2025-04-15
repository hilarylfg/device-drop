import {axiosInstance} from "@/shared/services/instance";
import {CheckoutFormValues} from "@/shared/constants";
import toast from "react-hot-toast";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const response = await axiosInstance.post<{ paymentUrl: string }>('/order/create', data, {withCredentials: true});
        window.location.href = response.data.paymentUrl;
        toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
            icon: '✅',
        });
    } catch (err) {
        console.error('[CreateOrder] Client error', err);
        throw new Error('Не удалось создать заказ');
    }
}