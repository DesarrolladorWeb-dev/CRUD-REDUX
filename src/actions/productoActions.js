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
    COMENZAR_EDICION_PRODUCTO
} from '../types';



import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// Crear nuevo Producto
export function crearNuevoProductoAction(producto){
    return async (dispatch)=> {
        dispatch(agregarProduto());
        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien actualizr el state
            dispatch(agregarProductoExito(producto));
            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));
            // Alerta de error
            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text :'Hubo un error , intenta de nuevo'
        })
        }
        }
    }

const agregarProduto = () => ({
    type : AGREGAR_PRODUCTO,
    payload: true
})

// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// funcion que descarga los prodcutos de la base de datos
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch(descargarProductos());
        try{

            const respuesta = await clienteAxios.get('/productos')
            dispatch(descargaProductosExitosa(respuesta.data))

        }catch (error){
            console.log(error)
            dispatch(descargaProductosError())
        }
        }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGAR_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})
const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload:true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async (dispatch) =>{
    dispatch(obtenerProductoEliminar(id));
    try {
        await clienteAxios.delete(`/productos/${id}`)
        dispatch(eliminarProductoExito())

        //si se elimina mostrar alerta
        Swal.fire({
            title: "Eliminado!",
            text: "Producto Eliminado Correctamnete",
            icon: "success"
          });
        
    } catch (error) {
        dispatch(eliminarProductoError())
    }
}}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload : id //lo que el usuario presione
})  
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})
const eliminarProductoError = () => ({
    tyoe: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})


// Colocar producto en edicion
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}
const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload : producto
})
// Editar un registro en la api y state 
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())
        try {
        await clienteAxios.put(`/productos/${producto.id}`, producto);
        //una ves que se guarda correctamente
        dispatch( editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO
})
const editarProductoExito = producto => ({
    type : PRODUCTO_EDITADO_EXITO,
    //aqui remplazamos el producto para mostrar el pantalla ya actualizado - modificar el state
    payload:producto  
})
const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})
