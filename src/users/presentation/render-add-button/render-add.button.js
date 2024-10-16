import { showModal } from '../render-modal/render-modal';
import './render-add.button.css'

/**
 * 
 * @param {HTMLDivElement} element 
 * @param { () => void } callback
 */
export const renderAddButton = (element) => {
    
    //Creacion del boton
    const addButton = document.createElement('button');
    addButton.innerText = '+';
    addButton.classList.add('add-button');

    //Agregando el boton
    element.appendChild(addButton);

    //Eventos del boton
    addButton.addEventListener('click', () => {
        showModal()
    })
}