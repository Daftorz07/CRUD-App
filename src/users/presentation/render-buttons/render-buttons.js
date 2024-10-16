import usersStore from '../../store/users-store'
import { renderTable } from '../render-table/render.table';
import './render-buttons.css'

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const renderButtons = (element) => {

    //Creacion de los botonoes de navegacion
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next ➡️';

    const prevButton = document.createElement('button');
    prevButton.innerText = '⬅️ Prev';

    const currentPage = document.createElement('span');
    currentPage.id = 'current-page';
    currentPage.innerText = usersStore.getCurrentPage();

    //Agregando todos los botones a la tabla 
    element.append(prevButton, currentPage, nextButton);

    //Eventos
    nextButton.addEventListener('click', async () => {
        await usersStore.loadNextPage();
        currentPage.innerText = usersStore.getCurrentPage();
        renderTable(element)
    })

    prevButton.addEventListener('click', async () => {
        await usersStore.loadPreviousPage();
        currentPage.innerText = usersStore.getCurrentPage();
        renderTable(element)
    });
}