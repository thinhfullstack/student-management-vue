<template>
    <div class="form-blog">
        <h1 class="text-center p-4 text-uppercase text-primary">Thêm mới thông tin sinh viên</h1>
        <form class="row g-4" @submit.prevent="save()">
            <router-link :to="{ name: 'list-student' }">
                <button type="button" class="btn btn-secondary btn-back">Quay lại</button>
            </router-link>
            <div class="col-md-6">
                <label for="fullname" class="form-label">Họ và tên</label>
                <input type="text" 
                    v-model="inputValues.fullname" 
                    v-bind:class="{'is-invalid': errors.fullname}"
                    @blur="validate()"
                    class="form-control" id="fullname" placeholder="Nhập họ tên của bạn...">
                    <span class="text-danger" v-if="errors.fullname">{{ errors.fullname }}</span>
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" 
                    v-model="inputValues.email" 
                    v-bind:class="{'is-invalid': errors.email}"
                    @blur="validate()"
                    class="form-control" id="email" placeholder="Nhập email của bạn...">
                    <span class="text-danger" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="col-md-6">
                <label for="address" class="form-label">Địa chỉ</label>
                <input type="text" 
                    v-model="inputValues.address" 
                    v-bind:class="{'is-invalid': errors.address}"
                    @blur="validate()"
                    class="form-control" id="address" placeholder="Địa chỉ của bạn ...">
                    <span class="text-danger" v-if="errors.address">{{ errors.address }}</span>
            </div>
            <div class="col-md-6">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input type="text" 
                    v-model="inputValues.phone" 
                    v-bind:class="{'is-invalid': errors.phone}"
                    @blur="validate()"
                    class="form-control" id="phone" placeholder="Nhập số điện thoại của bạn...">
                    <span class="text-danger" v-if="errors.phone">{{ errors.phone }}</span>
            </div>
            <div class="col-md-6">
                <label for="avatar" class="form-label">Ảnh đại diện</label>
                <input type="file" class="form-control" id="avatar">
            </div>
            <fieldset class="row mb-3">
                <legend class="col-form-label col-sm-0 pt-4">Giới tính:</legend>
                <div class="col-sm-10">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="male" value="male" checked>
                        <label class="form-check-label" for="male">
                        Nam
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="famale" value="famale">
                        <label class="form-check-label" for="famale">
                        Nữ
                        </label>
                    </div>
                </div>
            </fieldset>
            <div class="col-12 btn-style">
                <button type="submit" class="btn btn-primary">Lưu lại</button>
                <button type="submit" class="btn btn-danger">Huỷ bỏ</button>
            </div>
        </form>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const inputValues = ref(
    {
        fullname: '',
        email: '',
        address: '',
        phone: '',
        genders: ['Nam', 'Nữ', 'Bê Đê']
    }
)

const errors = ref({
    fullname: '',
    email: '',
    address: '',
    phone: '',
    genders: ['Nam', 'Nữ', 'Bê Đê']
})

const validate = () => {
    errors.value.fullname = ''
    errors.value.email = ''
    errors.value.address = ''
    errors.value.phone = ''

    let isValid = true

    if(!inputValues.value.fullname) {
        errors.value.fullname = 'Bạn vui lòng nhập tên của bạn'
        isValid = false
    }

    if(!inputValues.value.email) {
        errors.value.email = 'Bạn vui lòng nhập email của bạn'
    } else if(!isEmail(inputValues.value.email)) {
        errors.value.email = 'Email phải nhập đúng định dạng' 
        isValid = false
    }

    if(!inputValues.value.address) {
        errors.value.address = 'Bạn vui lòng nhập địa chỉ của bạn'
        isValid = false
    }
    
    if(!inputValues.value.phone) {
        errors.value.phone = 'Bạn vui lòng nhập số điện thoại của bạn'
    } else if(!isNumber(inputValues.value.phone)) {
        errors.value.phone = 'Số điện thoại phải có dạng là số'
        isValid = false
    }

    return isValid
}

const isNumber = (value) => {
    return /^\d*$/.test(value)
}
const isEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

const save = () => {
    console.log(validate());
}

</script>

<style scoped>
    .form-blog {
        margin: 0;
        box-sizing: border-box;
        border: 1px solid #ccc;
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