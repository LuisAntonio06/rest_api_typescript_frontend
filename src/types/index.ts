import { object , string , number, boolean , type InferOutput, array } from "valibot";

export const DraftProductsSchema = object({
    name: string(),
    price: number()
})

/* Schema de Productos */
export const ProductSchema = object({   
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
});

/* Tomarlo como arreglo */
export const ProductsSchema = array(ProductSchema);
export type Product = InferOutput<typeof ProductSchema>