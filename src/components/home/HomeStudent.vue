<template>
    <div class="home-sv">
        <img alt="Vue logo" src="../../assets/logo.png">
        <router-link :to="{ name: 'list-student' }">
            <button class="btn-sv">Đi tới Quản lý sinh viên</button>
        </router-link>
    </div>
</template>

<style scoped>
    .home-sv {
        text-align: center;
        margin: 60px 0;
    }
    .btn-sv {
        display: block;
        margin: 0 auto;
        padding: 15px;
        border: none;
        outline: none;
        border-radius: 5px;
        background-color: greenyellow;
        color: green;
        text-transform: uppercase;
        cursor: pointer;
    }

    .btn-sv:hover {
        background-color: red;
        color: white;
    }

    a {
        text-decoration: none;
    }
</style>