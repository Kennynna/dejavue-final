import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createOrder} from "@/api";
import {IOrder} from "@/types";


export const orderKeys = {
    all: ['orders'] as const,
    list: () => orderKeys.all,
    detail: (id: string | number) => [...orderKeys.all, id],
} as const;


export const useCreateOrder = () => {

    const queryClient = useQueryClient();
    return useMutation<
        IOrder,              // что возвращает успешный запрос
        Error,               // тип ошибки
        IOrder               // что передаём в mutate (входные данные)
    >({
        mutationFn: createOrder,

        onSuccess: () => {

        },
    });
};
