import { Form, useNavigate, type ActionFunctionArgs , redirect, useFetcher } from "react-router-dom"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductServices"

type ProductsDetails = {
    product: Product
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({params} : ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id) 
        return redirect('/')
    }
}

export default function ProductDetails({product} : ProductsDetails) {

    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isAvailable = product.availability
     
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                    <input type="hidden" name="id" value={product.id}/>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                    >
                        Editar
                    </button>
                    <Form
                        className="w-full"
                        method="post"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={ (e) => {
                            if (!confirm('¿Eliminar?')) {
                                e.preventDefault();
                            }
                        }

                        }
                    >
                        <input 
                            type="submit" 
                            value="Eliminar"
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                        />
                    </Form>

                </div>
            </td>
        </tr>   
    )
}
