<template>
    <div class="form-blog">
        <h1 class="text-center p-4 text-uppercase text-primary">Cập nhật thông tin sinh viên</h1>
        <form class="row g-4">
            <router-link :to="{ name: 'list-student' }">
                <button type="button" class="btn btn-secondary btn-back">Quay lại</button>
            </router-link>
            <div class="col-md-6">
                <label for="fullname" class="form-label">Họ và tên</label>
                <input type="text" 
                    v-model="students.fullname" 
                    v-bind:class="{'is-invalid': errors.fullname}"
                    @blur="validate()"
                    class="form-control" id="fullname" placeholder="Nhập họ tên của bạn...">
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" 
                    v-model="students.email" 
                    v-bind:class="{'is-invalid': errors.email}"
                    @blur="validate()"
                    class="form-control" id="email" placeholder="Nhập email của bạn...">
            </div>
            <div class="col-md-6">
                <label for="address" class="form-label">Địa chỉ</label>
                <input type="text" 
                    v-model="students.address" 
                    v-bind:class="{'is-invalid': errors.address}"
                    @blur="validate()"
                    class="form-control" id="address" placeholder="Địa chỉ của bạn ...">
            </div>
            <div class="col-md-6">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input type="text" 
                    v-model="students.phone"
                    v-bind:class="{'is-invalid': errors.phone}"
                    @blur="validate()"
                    class="form-control" id="phone" placeholder="Nhập số điện thoại của bạn...">
            </div>
            <div class="col-md-6">
                <label for="avatar" class="form-label">Ảnh đại diện</label>
                <input type="file" @blur="validate()" class="form-control" id="avatar">
                <span class="text-danger" v-if="errors.avatar">{{ errors.avatar }}</span>
            </div>
            <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-0 pt-4">Giới tính: {{ students.genders }}</legend>
                <span class="text-danger" v-if="errors.genders">{{ errors.genders }}</span>
                <div class="col-sm-10" >
                    <input type="radio" class="form-check-input me-3" id="male" value="Nam" 
                        @blur="validate()" 
                        v-model="students.genders">
                    <label class="form-check-label" for="male">Nam</label><br>

                    <input type="radio" class="form-check-input me-3" id="famale" value="Nữ" 
                        @blur="validate()" 
                        v-model="students.genders">
                    <label class="form-check-label" for="famale">Nữ</label><br>

                    <input type="radio" class="form-check-input me-3" id="other" value="Khác" 
                        @blur="validate()" 
                        v-model="students.genders">
                    <label class="form-check-label" for="other">Khác</label>
                </div>
            </fieldset>
            <div class="col-12 btn-style">
                <button @click.prevent="save()" type="submit" class="btn btn-primary">Cập nhật</button>
                <button type="submit" class="btn btn-danger">Huỷ bỏ</button>
            </div>
        </form>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const params = route.params
const students = ref(
    {
        fullname: '',
        email: '',
        address: '',
        phone: '',
        avatar: '',
        genders: ''
    }
)

const errors = ref({
    fullname: '',
    email: '',
    address: '',
    phone: '',
    avatar: '',
    genders: ''
})

const validate = () => {
    errors.value.fullname = ''
    errors.value.email = ''
    errors.value.address = ''
    errors.value.phone = ''
    errors.value.avatar = ''
    errors.value.genders = ''

    let isValid = true

    if(!students.value.fullname) {
        errors.value.fullname = 'Vui lòng nhập tên của bạn!'
        isValid = false
    }

    if(!students.value.email) {
        errors.value.email = 'Vui lòng nhập email của bạn!'
    } else if(!isEmail(students.value.email)) {
        errors.value.email = 'Email phải nhập đúng định dạng!' 
        isValid = false
    }

    if(!students.value.address) {
        errors.value.address = 'Vui lòng nhập địa chỉ của bạn!'
        isValid = false
    }
    
    if(!students.value.phone) {
        errors.value.phone = 'Vui lòng nhập số điện thoại của bạn!'
    } else if(!isNumber(students.value.phone)) {
        errors.value.phone = 'Số điện thoại phải có dạng là số!'
        isValid = false
    }

    if(!students.value.genders) {
        errors.value.genders = 'Vui lòng chọn giới tính của bạn!'
    }

    return isValid
}

const isNumber = (value) => {
    return /^\d*$/.test(value)
}
const isEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

onMounted(() => {
    axios.get(`http://localhost:8000/api/students/${params.id}`).then(res => {
        students.value = res.data
    }).catch(err => {
        console.log(err);
    })
})

const save = () => {
    if(validate() ) {
        axios.put(`http://localhost:8000/api/students/${params.id}`, {
            fullname: students.value.fullname,
            email: students.value.email,
            address: students.value.address,
            phone: students.value.phone,
            gender: students.value.genders
        }).then(res => {
            if(res.data.success) {
                router.push({name: 'list-student'})
            }

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
                title: 'Cập nhật sinh viên thành công!'
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

</script>

<style scoped>
    .form-blog {
        margin: 0;
        box-sizing: border-box;
    }

    form {
        padding: 20px;
    }
    .btn-style {
        display: flex;
        gap: 10px;
    }
    .btn-back {
        float: right;
        margin: 0 10px 5px 0;
    }
</style>