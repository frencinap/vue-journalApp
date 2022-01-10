<template>
    <span class="login100-form-title p-b-41">
		Ingresar
	</span>
	<form class="login100-form validate-form p-b-33 p-t-5"
		@submit.prevent="onSubmit">

		<div class="wrap-input100 validate-input" data-validate = "Enter username">
			<input v-model="userForm.email" class="input100" type="text" placeholder="Correo" required>
			<span class="focus-input100" data-placeholder="&#xe82a;"></span>
		</div>

		<div class="wrap-input100 validate-input" data-validate="Enter password">
			<input v-model="userForm.password" class="input100" type="password" placeholder="Contraseña" required>
			<span class="focus-input100" data-placeholder="&#xe80f;"></span>
		</div>

		<div class="container-login100-form-btn m-t-32">
			<button class="login100-form-btn"
				type="submit">
				Login
			</button>
		</div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name:'register' }">¿No tienes cuenta?</router-link>
        </div>
	</form>
</template>

<script>

import { ref } from "vue"
import useAuth from "../composables/useAuth"
//vue router para redireccionar
import { useRouter } from "vue-router";
//alertas de autenticación
import Swal from "sweetalert2";

export default {
	
	setup(){
		const router = useRouter()
		const { loginUser } = useAuth()

		const userForm = ref({
			email: 'francisco@gmail.com',
			password:  '123456',
		})

		return {
			userForm,

			onSubmit: async() =>{
				//console.log(userForm.value);
				const {ok, message} = await loginUser(userForm.value)
				
				if( !ok ) Swal.fire('Error', message, 'error')
				else router.push({name: 'no-entry'})
			}
		}
	}
}
</script>

<style>

</style>