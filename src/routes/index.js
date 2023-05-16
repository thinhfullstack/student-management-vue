import { createRouter, createWebHashHistory } from 'vue-router'

import ListUser from '../components/users/ListUser.vue'
import CreateUser from '../components/users/CreateUser.vue'
import EditUser from '../components/users/EditUser.vue'
import HomeStudent from '../components/home/HomeStudent.vue'
import CreateStudent from '../components/students/CreateStudent.vue'
import ListStudent from '../components/students/ListStudent.vue'
import EditStudent from '../components/students/EditStudent.vue'
import Login from '../components/auth/Login.vue'
import Register from '../components/auth/Register.vue'

const routes = [
    { 
        path: '/', 
        component: HomeStudent,
        name: 'home',
    },

    {
        path: '/usersInfo',
        children: [
            {
                path: '/usersInfo/list-user',
                component: ListUser,
                name: 'list-user',
            },
            {
                path: '/usersInfo/create-user',
                component: CreateUser,
                name: 'create-user',
            },
            {
                path: '/usersInfo/:id',
                component: EditUser,
                name: 'edit-user',
            }
        ]
    },

    { 
        path: '/list-student', 
        children: [
            {
                path: '/list-student',
                component: ListStudent,
                name: 'list-student',
            },
            { 
                path: '/list-student/create-student', 
                component: CreateStudent,
                name: 'create-student',
            },
            {
                path: '/list-student/:id', 
                component: EditStudent,
                name: 'edit-student',
            }
        ]
    },

    {
        path: '/auth',
        children: [
            {
                path: '/auth/login',
                component: Login,
                name: 'login'
            },
        
            {
                path: '/auth/register',
                component: Register,
                name: 'register'
            }
        ]
    },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
    let userInfo = JSON.parse(localStorage.getItem('user_info'))
    
    if(userInfo && userInfo.token && to.name === 'login') {
        return next({name: 'home'})
    }

    if(!userInfo && to.name !== 'login') {
        return next({name: 'login'})
    } 

    next()
})

export default router