<template>
    <div class="form-blog">
        <h1 class="text-center p-4 text-danger text-uppercase">Danh sách tài khoản người dùng</h1>
        <router-link :to="{ name: 'create-user' }">
            <button type="button" class="btn btn-success btn-create">Thêm mới</button>
        </router-link>
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr class="text-center">
                    <th scope="col">STT</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(user, index) in users">
                    <th scope="row" class="text-center">{{ index + 1 }}</th>
                    <td>{{ user.fullname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td class="action">
                        <router-link :to="{ name: '' }">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-info">Chi tiết</button>
                        </router-link>
                        <router-link :to="{ name: 'edit-user', params:{id: user.id} }">
                            <button type="button" class="btn btn-primary">Sửa</button>
                        </router-link>
                        <router-link :to="{ name: '' }">
                            <button type="button" 
                                v-if="userInfo.id != user.id"
                                @click="deleteUser(user.id)"
                                class="btn btn-danger">Xoá</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-uppercase" id="exampleModalLabel">Thông tin chi tiết tài khoản người dùng</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-table p-2">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr class="text-center">
                                <th scope="col">STT</th>
                                <th scope="col">Ảnh đại diện</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Giới tính</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr :key="index" v-for="(user, index) in users">
                                <th scope="row" class="text-center">{{ index + 1 }}</th>
                                <td>
                                    <img src="" alt="">
                                </td>
                                <td>{{ user.fullname }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.password }}</td>
                                <td>{{ user.address }}</td>
                                <td>{{ user.phone }}</td>
                                <td>{{ user.gender }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Xác nhận</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>

import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'

const users = ref([])

const userInfo = computed(() => {
    let userObject = JSON.parse(localStorage.getItem('user_info'))

    if(!userObject) {
        return null
    }
    return userObject.user
}) 


onMounted(() => {
    getStudent()
})

const getStudent = () => {
    axios.get(`http://localhost:8000/api/users`).then(res => {
        users.value = res.data
    }).catch(err => {
        console.log(err);
    })
}

const deleteUser = (id) => {
    Swal.fire({
        title: "Bạn có chắc muốn xoá không?",
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: 'Có',
        cancelButtonText: "Không",
    }).then((confirm) => {
        if(confirm.isConfirmed) {
            axios.delete(`http://localhost:8000/api/students/${id}`).then(res => {
                getStudent()

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
                    icon: 'success',
                    title: 'Xoá sinh viên thành công!'
                })
            }).catch(err => {
                console.log(err);
            })
        }
    })
}

</script>

<style scoped>
    .action {
        display: block;
        text-align: center;
    }
    .action a {
        margin: 5px;
    }
    .action a button {
        padding: 4px;
        border-radius: 3px;
        border: none;
        outline: none;
        border: 1px solid #ccc;
    }
    button.btn-create {
        float: right;
        margin: 0 10px 5px 0;
    }
</style>