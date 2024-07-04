import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGAR_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_ERROR,
    PRODUCTO_EDITADO_EXITO,
} from '../types'

// Cada reducer tiene su propio state
const initialState = {
    productos :  [], 
    error : null,
    loading : false,
    productoeliminar : null,
    productoeditar : null
}

export default function(state = initialState ,  action){

    switch (action.type) {
        case COMENZAR_DESCARGAR_PRODUCTOS:
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: action.payload
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                productos: [...state.productos, action.payload ]
            }
        case DESCARGA_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return{
                ...state,
                loading: false,
                error:action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                productos: action.payload
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoeliminar : action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                productos: state.productos.filter(productos => productos.id !== state.productoeliminar),
                productoeliminar: null //como ya lo usamos lo volvemos a null

            }
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoeditar : action.payload
            }
        case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                productoeditar : null,
                // tomamos todos los productos del state iteramos en ellos y si encuentra el id remplaza todo el objeto con lo que pasa con el payload
                productos : state.productos.map(
                    producto =>  producto.id === action.payload.id ? producto=action.payload : producto
                )
            }
        default:
            return state;
    }
}
