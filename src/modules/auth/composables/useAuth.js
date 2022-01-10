import { computed } from "vue"
import { useStore } from "vuex"


const useAuth = ( ) => {

    const store = useStore()

    const createUser = async( user ) => {
        const res = await store.dispatch('authModule/createUser', user)
        return res
    } 

    const loginUser = async( user ) => {
        const res = await store.dispatch('authModule/signInUser', user)
        return res
    }

    const logout = () => {
        store.commit('authModule/logout')
        store.commit('journalModule/clearEntries')
    }

    const checkTokens = async() => {
        const res = await store.dispatch('authModule/checkAuthStatus')
        return res
    }



    return{
        checkTokens,
        createUser,
        loginUser,
        logout,

        authStatus: computed(() => store.getters['authModule/currentState']),

        user: computed(() => store.getters['authModule/userName']), 
    }
}

export default useAuth