<template>
    <div class="form-blog">
        <h1 class="text-center p-4 text-danger text-uppercase">Danh sách sinh viên</h1>
        <router-link :to="{ name: 'create-student' }">
            <button type="button" class="btn btn-success btn-create">Thêm mới</button>
        </router-link>
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr class="text-center">
                    <th scope="col">STT</th>
                    <th scope="col">Ảnh đại diện</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(student, index) in students">
                    <th scope="row" class="text-center">{{ index + 1 }}</th>
                    <td>
                        <img src="" alt="">
                    </td>
                    <td>{{ student.fullname }}</td>
                    <td>{{ student.email }}</td>
                    <td>{{ student.address }}</td>
                    <td>{{ student.phone }}</td>
                    <td>{{ student.gender }}</td>
                    <td class="action">
                        <router-link :to="{ name: '' }">
                            <button type="button" class="btn btn-info">Chi tiết</button>
                        </router-link>
                        <router-link :to="{ name: 'edit-student', params:{id: student.id} }">
                            <button type="button" class="btn btn-primary">Sửa</button>
                        </router-link>
                        <router-link :to="{ name: '' }">
                            <button type="button" 
                                @click="deleteStudent(student.id)"
                                class="btn btn-danger">Xoá</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>

import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'

const students = ref([])

onMounted(() => {
    getStudent()
})

const getStudent = () => {
    axios.get(`http://localhost:8000/api/students`).then(res => {
        students.value = res.data
    }).catch(err => {
        console.log(err);
    })
}

const deleteStudent = (id) => {
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