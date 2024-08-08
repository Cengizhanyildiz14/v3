<template>
    <div class="bg-red-600">
        <login-component></login-component>
    </div>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue'
export default {
    components: {
        LoginComponent: LoginComponent
    }
}
</script>