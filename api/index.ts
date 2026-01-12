export {getProducts} from "./products/get-products";


// @ts-ignore
const BASE_URL = import.meta.env.VITE_BASE_URL;
// @ts-ignore
const ALL_PRODUCTS = import.meta.env.VITE_ALL_PRODUCTS;

export const API = {
    BASE_URL,
    ALL_PRODUCTS,
}