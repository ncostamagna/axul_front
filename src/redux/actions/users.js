import {
    USER_LOGIN
} from '../types';

export function loginAction(producto) {
    return async (dispatch) => {
        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
           dispatch( agregarProductoExito(producto) );

            // Alerta
            Swal.fire(
                'Correcto', 
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch( agregarProductoError(true) );

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const setUserLogin = (user, token) => ({
    type: USER_LOGIN,
    payload: {user, token}
});
