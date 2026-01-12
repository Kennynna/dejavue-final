
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api';
import {IProduct} from "../src/types";

export const productsKeys = {
    all: ['products'] as const,
    list: () => productsKeys.all,
} as const;

export const useProducts = () => {
    return useQuery<IProduct[], Error>({
        queryKey: productsKeys.list(),
        queryFn: getProducts,
        staleTime: 1000 * 60 * 4,      // 4 минуты — хороший компромисс
        gcTime: 1000 * 60 * 15,        // 15 минут
        retry: 2,                      // количество повторных попыток
        // refetchOnWindowFocus: false, // если не хочешь перезагружать при возврате на вкладку
    });
};