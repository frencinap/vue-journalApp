
export default {

    name: 'auth',
    component: () => import(/* webpackChunkName: "auth layout" */ "@/modules/auth/layouts/AuthLayout.vue"),
    children: [
        {
            //path vacío, apenas entre a auth mostrará esta ruta
            path: '',
            name: 'login',
            component: () =>import(/* webpackChunkName: "auth login" */ "@/modules/auth/views/Login.vue"),
        },
        {
            
            path: 'register',
            name: 'register',
            component: () =>import(/* webpackChunkName: "auth register" */ "@/modules/auth/views/Register.vue"),
        }
    ]
}