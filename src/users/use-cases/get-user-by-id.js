import { localHostUserToModel } from "../mappers/localHost-user.mapper";
import { User } from "../models/user";


/**
 * 
 * @param {String|Number} IdUser 
 * @returns {Promise<User>}
 */
export const getUserById = async (idUser) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${idUser}`;
    const res = await fetch(url);
    const data  = await res.json();


    const user = localHostUserToModel(data); //

    //console.log("Usuario seleccionado: ", user);
    return user;

}

