<template>
    <section class="vh-100" style="background-color: #508bfc;">
		<div class="container py-5 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-6">

                            <h3 class="mb-5 text-center">Đăng ký</h3>

                            <div class="mb-4">
                                <label class="form-label" for="typeEmailX-2">Họ và tên</label>
                                <input type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder="Nhập họ và tên của bạn..."/>
                            </div>

                            <div class="mb-4">
                                <label class="form-label" for="typeEmailX-2">Email</label>
                                <input type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder="Nhập email của bạn..."/>
                            </div>

                            <div class="mb-4">
                                <label class="form-label" for="typePasswordX-2">Mật khẩu</label>
                                <input type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Nhập mật khẩu của bạn..." />
                            </div>

                            <!-- Checkbox -->
                            <div class="form-check d-flex justify-content-start mb-4">
                                <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
                                <label class="form-check-label" for="form1Example3">Nhớ mật khẩu</label>
                            </div>

                            <button @click.prevent="register()" class="btn btn-primary btn-lg btn-block" type="submit">Đăng ký</button>

                        </div>
                    </div>
                </div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute()

const register = () => {
    // localStorage.setItem('isLogged', 1)
	router.push({name: 'login'})
}
</script>

<style scoped>

</style>