


/**
 * 
 * @param {String|Number} idUser 
 */
export const deleteUserById = async (idUser) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${idUser}`;

    const res = await fetch(url, {
        //Configuracion de la peticion
        method: 'DELETE',
    })

    const deleteResult = await res.json();

    console.log("Usuario Eliminado: ", { deleteResult });

    return true;
}