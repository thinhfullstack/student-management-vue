<template>
    <div class="form-blog">
        <h1 class="text-center p-4 text-uppercase text-primary">Cập nhật thông tin sinh viên</h1>
        <form class="row g-4">
            <router-link :to="{ name: 'list-student' }">
                <button type="button" class="btn btn-secondary btn-back">Quay lại</button>
            </router-link>
            <div class="col-md-6">
                <label for="fullname" class="form-label">Họ và tên</label>
                <input type="text" class="form-control" id="fullname" placeholder="Nhập họ tên của bạn...">
            </div>
            <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Nhập email của bạn...">
            </div>
            <div class="col-md-6">
                <label for="address" class="form-label">Địa chỉ</label>
                <input type="text" class="form-control" id="address" placeholder="Địa chỉ của bạn ...">
            </div>
            <div class="col-md-6">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input type="text" class="form-control" id="phone" placeholder="Nhập số điện thoại của bạn...">
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
                <button type="submit" class="btn btn-primary">Cập nhật</button>
                <button type="submit" class="btn btn-danger">Huỷ bỏ</button>
            </div>
        </form>
    </div>
</template>

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