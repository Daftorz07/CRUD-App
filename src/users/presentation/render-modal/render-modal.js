import modalHTML from './render-modal.html?raw'; // ?raw es sintaxis para que Vite lo reconozca
import './render-modal.css';
import { User } from "../../models/user";
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;

let loadedUser = {};

/**
 * 
 * @param {String|Number} idUser 
 */
export const showModal = async (idUser) => {

    // ?: Si existe el modal o formulario
    modal?.classList.remove('hide-modal')

    loadedUser = {}

    if(!idUser) return;
    const user = await getUserById(idUser);

    setFormValues(user)
    
}

export const hideModal = () => {

    // ?: Si existe el modal o formulario
    modal?.classList.add('hide-modal')
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {

    //Seteo de los valores del usuario en el modal
    form.querySelector('[name="firstName"]').value = user.firstName
    form.querySelector('[name="lastName"]').value = user.lastName
    form.querySelector('[name="balance"]').value = user.balance
    form.querySelector('[name="isActive"]').checked = user.isActive

    //Usuario campos
    loadedUser = user
}


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */
export const renderModal = (element, callback) => {

    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hide-modal';

    //Referencia completa al element Form
    form = modal.querySelector('form');

    //Eventos para cerrar el modal
    modal.addEventListener('click', (e) => {
        if (e.target.className === 'modal-container') {
            hideModal();
        }
    })

    //Control del formulario
    form.addEventListener('submit', async (e) => {

        //Evitando la propagacion del formulario - Recargar pagina
        e.preventDefault();

        /**
         * FormData permite manejar fácilmente formularios multipartes 
         * sin tener que codificar manualmente los datos.
         */
        const formData = new FormData(form);

        const userLike = {...loadedUser};

        for (const [key, value] of formData) {
            
            //Validar que el campo balance sea un numero
            if (key === 'balance') {
                userLike[key] = Number(value);
                continue;
            }

            //Validar que el campo isActive sea un boolean
            if (key === 'isActive') {
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }

            userLike[key] = value
        }

        //console.log(userLike);

        //Callback de actualizacion o creacion de usuario
        await callback(userLike)

        hideModal();
    })
    element.append(modal)
}