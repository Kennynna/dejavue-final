export type IProduct = {
    id: number,
    name: string,
    brand: string,
    price: number,
    images: string[],
    gender: string,
    volume: string,
    rating: number,
    description: string,
    featured: boolean,
}


type OrderProduct = Omit <IProduct, "id" | "description" | 'featured' | 'rating' & {
    quantity: number,
}>

export type IOrder = {
        name?: string,
        address?: string,
        "number": string,
        "withCurer": boolean,
        MyOrder: OrderProduct[]
}