import { localHostUserToModel } from "../mappers/localHost-user.mapper";
import { User } from "../models/user";

/**
 * Carga los usuarios por página desde el servidor
 * @param {number} page Número de la página a cargar
 * @returns {Promise<User[]>} Promesa que resuelve en un array de usuarios
 */

export const loadUsersByPage = async (page = 1) => {
    try {
        // Construcción de la URL usando la variable de entorno VITE_BASE_URL
        const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;

        // Realizar la solicitud HTTP
        const response = await fetch(url);

        // Validar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Parsear la respuesta JSON
        const data = await response.json();

        // Mapear los datos para transformarlos al modelo de usuario
        const users = data.map(localHostUserToModel);

        // Mostrar los usuarios en consola (solo para depuración)
        //console.log("loadUsersByPage:", users);

        // Retornar la lista de usuarios
        return users;

    } catch (error) {
        // Manejo de errores
        console.error('Error al cargar los usuarios:', error);
        return []; // Retornar un array vacío en caso de error
    }
};
