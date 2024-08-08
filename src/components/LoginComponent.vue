<template>
  <div class="flex flex-col items-center justify-center h-screen bg-[#002b36] space-y-6">
    <!-- Logo ve Yazı Bölümü -->
    <div class="mb-8 text-center">
     <router-link to="/">
      <img src="@/assets/SivasCumhuriyetÜniLogo.png" alt="Sivas Cumhuriyet Üniversitesi Logo" class="w-32 h-32 mx-auto mb-2">
     </router-link>
      <p class="text-2xl font-semibold text-white">SİVAS<br>CUMHURİYET ÜNİVERSİTESİ<br><span class="text-lg italic">Gelenekten Geleceğe...</span></p>
    </div>

    <!-- Giriş Yap ve Kayıt Ol Bölümleri -->
    <div class="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-12">
      <!-- Giriş Yap Bölümü -->
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 class="mb-6 text-2xl font-semibold text-center">Hesabına Giriş Yap</h2>
        
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <input v-model="user.email" @blur="validateEmail" class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" id="email" type="email" placeholder="Email">
            <p v-if="errors.email" class="text-xs italic text-red-500">{{ errors.email }}</p>
          </div>
          <div>
            <input v-model="user.password" @blur="validatePassword" class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" id="password" type="password" placeholder="Şifre">
            <p v-if="errors.password" class="text-xs italic text-red-500">{{ errors.password }}</p>
          </div>
          <button :disabled="!isFormValid" class="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50" type="submit">
            Giriş Yap
          </button>
        </form>
      
        <!-- Kayıt Ol Linki -->
        <div class="mt-4 text-right">
          <p class="text-sm text-gray-600">Burada yenimisin?</p>
          <router-link to="/register" class="text-sm font-bold text-blue-500 hover:text-blue-800">Kayıt Ol</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {
        email: null,
        password: null,
      }
    }
  },
  computed: {
    isFormValid() {
      return !this.errors.email && !this.errors.password;
    }
  },
  methods: {
    validateEmail() {
      this.errors.email = this.user.email.length === 0 ? 'Email boş olamaz.' : null;
    },
    validatePassword() {
      this.errors.password = this.user.password.length === 0 ? 'Şifre boş olamaz.' : null;
    },
    login() {
      if (this.isFormValid) {
        axios.post('http://localhost:5027/api/Auth/login', this.user)
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('userToken', token);
            this.$router.push('/');
          }).catch(error => {
            console.log(error);
          });
      }
    }
  }
}
</script>
