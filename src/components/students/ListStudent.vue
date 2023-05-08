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
                <tr>
                    <th scope="row" class="text-center">1</th>
                    <td>
                        <img src="" alt="">
                    </td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td class="action">
                        <router-link :to="{ name: '' }">
                            <button type="button" class="btn btn-info">Chi tiết</button>
                        </router-link>
                        <router-link :to="{ name: 'edit-student', params:{id: 1} }">
                            <button type="button" class="btn btn-primary">Sửa</button>
                        </router-link>
                        <router-link :to="{ name: '' }">
                            <button type="button" class="btn btn-danger">Xoá</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script setup>

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