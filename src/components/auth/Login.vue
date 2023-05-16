<template>
    <section class="vh-100" style="background-color: #508bfc;">
		<div class="container py-5 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-5">
				<div class="card shadow-2-strong" style="border-radius: 1rem;">
				<div class="card-body p-6">

					<h3 class="mb-5 text-center">Đăng nhập</h3>

					<div class="mb-4">
						<label class="form-label" for="typeEmailX-2">Email</label>
						<input type="email" id="typeEmailX-2"
							v-on:keyup.enter="login()"
							v-model="state.formLogin.email"
							v-bind:class="{'is-invalid': errorLogin.email}"
							@blur="validateLogin()" 
							class="form-control form-control-lg" placeholder="Nhập email của bạn..."/>
							<span class="text-danger" v-if="errorLogin.email">{{ errorLogin.email }}</span>
					</div>

					<div class="mb-4">
						<label class="form-label" for="typePasswordX-2">Mật khẩu</label>
						<input type="password" id="typePasswordX-2" 
							v-on:keyup.enter="login()"
							v-model="state.formLogin.password"
							v-bind:class="{'is-invalid': errorLogin.password}"
							@blur="validateLogin()"
							class="form-control form-control-lg" placeholder="Nhập mật khẩu của bạn..." />
							<span class="text-danger" v-if="errorLogin.password">{{ errorLogin.password }}</span>
					</div>

					<!-- Checkbox -->
					<div class="form-check d-flex justify-content-start mb-2">
						<input class="form-check-input" type="checkbox" value="" id="form1Example3" />
						<label class="form-check-label" for="form1Example3">Nhớ mật khẩu</label>
						
					</div>
					<p class="mb-2 pb-lg-2" style="color: #393f81;">Chưa có tài khoản? 
						<router-link :to="{name: 'register'}"
                      		style="color: #393f81; text-decoration: underline;">Đăng ký tại đây!
						</router-link>
					</p>

					<button @click.prevent="login()" class="btn btn-primary btn-lg btn-block" type="submit">Đăng nhập</button>

					<hr class="my-4">

					<button class="btn btn-lg btn-block btn-primary" style="background-color: #dd4b39;"
						ype="submit"><i class="fab fa-google me-2"></i>Đăng nhập bằng Google</button>
					<button class="btn btn-lg btn-block btn-primary mb-2" style="background-color: #3b5998;"
						type="submit"><i class="fab fa-facebook-f me-2"></i>Đăng nhập bằng Facebook</button>

				</div>
				</div>
			</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()

const state = reactive({
	formLogin: {
		email: '',
		password: ''
	}
})

const errorLogin = ref({
	email: '',
	password: ''
})

const isEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

const validateLogin = () => {
	errorLogin.value.email = '',
	errorLogin.value.password = ''

	if(!state.formLogin.email) {
		errorLogin.value.email = 'Vui lòng nhập email của bạn!'
	} else if(!isEmail(state.formLogin.email)) {
        errorLogin.value.email = 'Email phải nhập đúng định dạng!' 
    }

	if(!state.formLogin.password) {
		errorLogin.value.password = 'Vui lòng nhập password của bạn!'
	}
}

const login = () => {
	validateLogin()
	axios.post(`http://localhost:8000/api/login`, state.formLogin).then(res => {
		if(!res.data.success) {
			// alerMessage('error', 'Email hoặc mật khẩu không chính xác!')
			return
		}
		localStorage.setItem('user_info', JSON.stringify({
			user: res.data.user,
			token: res.data.token
		}))
		
		router.push({name: 'home'})

	}).catch(() => {
		alerMessage('error', 'Đăng nhập thất bại!')
	})

}

const alerMessage = (icon, message) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	Toast.fire({
		icon: icon,
		title: message
	})
}
</script>

<style scoped>

</style>