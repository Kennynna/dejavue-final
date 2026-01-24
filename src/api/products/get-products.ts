import {API} from "../index";


export const getProducts = async () => {
    const products = await fetch(`${API.BASE_URL}${API.ALL_PRODUCTS}`);
    const response = await products.json();
    console.log(response);
    return response.data;

}