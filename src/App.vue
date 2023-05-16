<template>
    <Header v-if="route.name !== 'login'"/>
    <router-view></router-view>
    <Footer v-if="route.name !== 'login'"/>
</template>

<script setup>
import Header from './components/home/Header.vue';
import Footer from './components/home/Footer.vue';
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

// const vuex = ref([])

onMounted(() => {
    // console.log($store);
})
</script>

<style scoped>
  
</style>