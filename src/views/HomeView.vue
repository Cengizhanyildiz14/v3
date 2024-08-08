<template>
    <div>
        <navbar-component></navbar-component>
        <router-view></router-view>
        <footer-component></footer-component>
    </div>
</template>
  
<script>
import Navbar from '@/components/NavbarComponent.vue'
import Footer from '@/components/FooterComponent.vue'
export default {
    components: {
        NavbarComponent: Navbar,
        FooterComponent: Footer
    } 
}
</script>
  