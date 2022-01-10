import authApi from '@/API/authApi'


// las acciones son async

//crear usuario
export const createUser = async( {commit} , user) => {

    const { name, email, password } = user

    try {

        const { data } = await authApi.post(':signUp', { email,password, returnSecureToken: true })
        //console.log(data);
        //idToken y refreshToken
        const{ idToken, refreshToken} = data

        await authApi.post(':update', { displayName: name, idToken })

        //no agregamos authModule, porque estamos desde el mismo modulo "fisicamente"
        //eliminamos el password para que no quede almacenado dentro del state
        delete user.password
        commit('loginUser', { user, idToken, refreshToken })
        

        return {ok:true}
        
    } catch (error) {
        console.log(error.response);
        return {ok:false, message: 'Este correo ya está registrado'}
    }
}

//ingreso de usuario
export const signInUser = async( {commit} , user) => {

    // with email and password
    const { email, password } = user

    try {

        const { data } = await authApi.post(':signInWithPassword', { email,password, returnSecureToken: true })
        //console.log(data);
        //idToken y refreshToken y displayName
        const{ idToken, refreshToken, displayName} = data
        user.name = displayName
        commit('loginUser', { user, idToken, refreshToken })
        

        return {ok:true}
        
    } catch (error) {
        console.log(error.response);
        return {ok:false, message: 'Datos no válidos'}
    }
}

//chequeo de status
export const checkAuthStatus = async({commit}) => {

    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if( !idToken ) {
        commit('logout')
        return{ ok: false, message: 'No hay tokens'}
    }

    try {
        
        const { data } = await authApi.post(':lookup', { idToken })
        //console.log(data);
        const { displayName, email} = data.users[0]

        const user = {
            name: displayName,
            email
        }
        commit('loginUser', {user, idToken, refreshToken})
        return{ ok:true}
 
    } catch (error) {
        commit('logout')
        return{ ok:false, message: error.response.data.error.message}
    }
    
}