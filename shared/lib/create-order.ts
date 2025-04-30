import {CheckoutFormValues} from "@/shared/constants";
import toast from "react-hot-toast";
import {api} from "@/shared/services/instance";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const response = await api.post<{ paymentUrl: string }>('order/create', data);
        window.location.href = response.paymentUrl;
        toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
            icon: '✅',
        });
    } catch (err) {
        console.error('[CreateOrder] Client error', err);
        throw new Error('Не удалось создать заказ');
    }
}