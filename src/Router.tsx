import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products , { loader as productsLoader , action as updateAvailabilityAction} from './pages/Products'
import NewProduct , { action as newProductAction} from './pages/NewProduct'
import EditProduct , {loader as editProductLoader , action as actionProductAction} from './pages/EditProduct'
import { action as deleteProductsActions } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar', /* ROA Pattern , Resource-oriented design */
                element: <EditProduct/>,
                loader: editProductLoader,
                action: actionProductAction
            },{
                path: 'productos/:id/eliminar', 
                action: deleteProductsActions
            }

        ]
    }
])  