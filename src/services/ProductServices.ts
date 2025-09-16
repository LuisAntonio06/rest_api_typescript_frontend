import { safeParse , number, parse, string,  transform, pipe} from "valibot";
import { DraftProductsSchema , ProductsSchema , type Product , ProductSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductsSchema, {
            name: data.name,
            price: +data.price
        });
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;;
            await axios.post(url, {
            name: result.output.name,
            price: result.output.price
            });

        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error); 
    }   
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;;
        const { data } = await axios(url);
        const result = safeParse(ProductsSchema , data.data)
        if (result.success) {
            return result.output
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;;
        const { data } = await axios(url);
        const result = safeParse(ProductSchema , data.data)
        if (result.success) {
            return result.output
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updatedProduct( data : ProductData, id : Product['id'] ){
    try {

        const NumberSchema = pipe(string(),transform(Number), number())

        const result = safeParse(ProductSchema , {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url , result.output)
        }

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct( id: Product['id'] ){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url) 
    } catch (error) {
        console.log(error);
    }
}

export async function updatedProductAvailability(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error);       
    }
}