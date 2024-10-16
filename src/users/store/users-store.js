import { loadUsersByPage } from "../use-cases/load-users-by-page"

const state = {
    currentPage: 0,
    users: []
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1)
    if (users.length === 0) return;

    //Si la pagina contiene usuarios, se incrementa la página
    state.currentPage += 1
    state.users = users
}

const loadPreviousPage = async () => {

    //si es la primera página, no hay páginas anteriores
    if (state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage - 1)
    
    state.currentPage -= 1
    state.users = users
}

/**
 * @param {User} updateUser
 */
const onUserChanged = (updateUser) => {

    let wasFound = false
    
    state.users = state.users.map( user => {
        
        if (user.id === updateUser.id) {
            wasFound = true
            return updateUser
        }

        return user
    })

    if (state.users.length < 10 && !wasFound) { 
        state.users.push(updateUser)
    }

}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage)
    if (users.length === 0) {
        await loadPreviousPage()
        return
    }
    
    state.users = users
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],

    /**
    * 
    * @returns {Number}
    */
    getCurrentPage: () => state.currentPage
}
