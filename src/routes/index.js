import { createRouter, createWebHashHistory } from 'vue-router'

import HomeStudent from '../components/home/HomeStudent.vue'
import CreateStudent from '../components/students/CreateStudent.vue'
import ListStudent from '../components/students/ListStudent.vue'
import EditStudent from '../components/students/EditStudent.vue'

const routes = [
    { 
        path: '/', 
        component: HomeStudent,
        name: 'home',
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

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router