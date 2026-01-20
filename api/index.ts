export {getProducts} from "./products/get-products";
export  {createOrder} from "./order/create-order.ts"

// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;
// @ts-ignore
const ALL_PRODUCTS = import.meta.env.VITE_ALL_PRODUCTS;
const AUTH = import.meta.env.VITE_AUTH;
const LOCAL = import.meta.env.VITELOCAL;

// @ts-ignore

const ORDER = import.meta.env.VITE_ORDER;

export const API = {
    BASE_URL,
    ALL_PRODUCTS,
    ORDER,
    AUTH,
    LOCAL


}