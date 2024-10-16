import { User } from "../models/user"

/*
    En JavaScript, los "mappers" generalmente se refieren a funciones o métodos que transforman los datos de un formato a otro. 
*/

/**
 * 
 * @param {Like<User>} localHostUser 
 * @returns {User}
 */
export const localHostUserToModel = (localHostUser) => {

    // console.log(localHostUser);

    //Objeto desestructurado con los datos del usuario que llega desde el BackEnd
    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localHostUser

    //Usuario Mapeado a las propiedades usadas en la aplicacion
    return new User({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    })
}
