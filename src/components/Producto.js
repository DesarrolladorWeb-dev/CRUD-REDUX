import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';


const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    const navigate = useNavigate(); //habilidar history para la redireccion

    // Confirmar si desea eliminar 
    const confirmarEliminarProducto = id => {


        //preguntar al usuario
        Swal.fire({
            title: "Estas Seguro?",
            text: "Un producto que se elimina no se puede recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!",
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                // pasarlo al action
                dispatch(borrarProductoAction(id))  //se confirma la eliminacion en el productoAction.js

            }
          });
    }

    //funcion que redirige de forma programada 
    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto));
        navigate(`/productos/editar/${producto.id}`);
    }



    return ( 

        <tr>
            <td>{nombre}</td>
            <td> <span className='font-weight-bold'>${precio}</span></td>
            <td className='acciones'>
                <button
                type='button'
                onClick={() => redireccionarEdicion(producto)} //le pasamos el producto
                    className='btn btn-primary mr-2' 
                >
                    Editar
                </button>
                <button 
                type="button"
                className='btn btn-danger'
                onClick={()=> confirmarEliminarProducto(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}
 
export default Producto; 