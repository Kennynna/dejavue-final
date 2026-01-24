import {API} from "../index";
import {IOrder} from "@/types";

export const createOrder = async (order: IOrder) => {
    const response = await fetch(`${API.BASE_URL}${API.ORDER}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: order }),
    });

    // Проверяем HTTP статус до парсинга JSON
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${response.status}: ${response.statusText}`);
    }

    // Возвращаем распарсенный JSON
    return response.json();
}
