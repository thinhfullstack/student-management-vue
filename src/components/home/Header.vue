<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-xxl">
            <a class="navbar-brand" href="#">Trang chủ</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Quản Lý Sinh viên</a>
                </li>
                <li class="nav-item">
                    <router-link :to="{name: 'list-user'}" class="nav-link" href="#">
                        Quản Lý Tài Khoản
                    </router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Bài thi
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Reactjs</a></li>
                        <li><a class="dropdown-item" href="#">Vuejs</a></li>
                        <li><a class="dropdown-item" href="#">Laravel</a></li>
                        <li><a class="dropdown-item" href="#">MySQL</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Khác...</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" tabindex="-1" aria-disabled="true">Contact</a>
                </li>
            </ul>
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../../assets/avatar.jpg" class="rounded-circle"
                        height="35" width="35" alt="Avatar" loading="lazy" />
                        {{ getUserName }}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <router-link :to="{name: 'list-user'}" class="dropdown-item" >Trang cá nhân</router-link>
                        </li>
                        <li><a class="dropdown-item" href="#">Quản lý bài viết</a></li>
                        <li><a class="dropdown-item" href="#">Bài viết đã lưu</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item cursor-pointer" @click="logout()">Đăng xuất</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";


const router = useRouter()
const route = useRoute()

const getUserName = computed(() => {
    let userObject = JSON.parse(localStorage.getItem('user_info'))

    if(!userObject) {
        return null
    }

    return userObject.user.fullname
}) 

const logout = () => {
    localStorage.removeItem('user_info')
    return router.push({name: "login"})
}
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer
    }
</style>