import { localHostUserToModel } from "../mappers/localHost-user.mapper";
import { userModelToLocalHost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";



/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {

    const user = new User(userLike)

    //validar que los campos no esten vacios
    if (!user.firstName || !user.lastName) {
        throw new Error(`Los campos 'firstName' y 'lastName' son obligatorios`)
    }

    //Mapeo de los campos segun como los espera el servidor
    const userToSave = userModelToLocalHost(user)

    //Actualizar usuario
    let userUpdated;

    if (user.id) {
        userUpdated = await updateUser(userToSave)
    } else {
        userUpdated = await createUser(userToSave);
    }

    return localHostUserToModel(userUpdated)
}

/**
 * 
 * @param {Like<User>} user 
 */
const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`;

    const res = await fetch(url, {
        //Configuracion de la peticion
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newUser = await res.json();

    console.log("Usuario Creado: ", { newUser });

    return newUser;
}


/**
 * 
 * @param {Like<User>} user 
 */
const updateUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;

    const res = await fetch(url, {
        //Configuracion de la peticion
        method: 'PATCH', //PUT: Reemplaza todo por lo que le llega, PATCH: Reemplaza parcialmente
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const updateUser = await res.json();

    console.log("Usuario Actualizado: ", { updateUser });

    return updateUser;
}