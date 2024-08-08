<template>
  <div class="flex flex-col items-center justify-center h-screen space-y-6 bg-[#002b36]">
    <!-- Logo ve Yazı Bölümü -->
    <div class="mb-8 text-center">
      <router-link to="/">
        <img src="@/assets/SivasCumhuriyetÜniLogo.png" alt="Sivas Cumhuriyet Üniversitesi Logo"
          class="w-32 h-32 mx-auto mb-2">
      </router-link>
      <p class="text-2xl font-semibold text-white">SİVAS<br>CUMHURİYET ÜNİVERSİTESİ<br><span
          class="text-lg italic">Gelenekten Geleceğe...</span></p>
    </div>

    <!-- Register Form Bölümü -->
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h2 class="mb-6 text-2xl font-semibold text-center">Kayıt Ol</h2>
      <form @submit.prevent="register" class="space-y-4">
        <div v-if="errors.general" class="p-3 text-red-800 bg-red-200 rounded">
          {{ errors.general }}
        </div>
        <!-- Kullanıcı Adı Alanı -->
        <div>
          <label class="block mb-1 text-sm font-bold text-gray-700" for="username">Kullanıcı Adı</label>
          <input v-model="user.username" @blur="validateUsername"
            class="w-full px-4 py-2 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username" type="text" placeholder="Kullanıcı Adı">
          <p v-if="errors.username" class="text-xs italic text-red-500">{{ errors.username }}</p>
        </div>

        <!-- E-posta Alanı -->
        <div>
          <label class="block mb-1 text-sm font-bold text-gray-700" for="email">E-posta</label>
          <input v-model="user.email" @blur="validateEmail"
            class="w-full px-4 py-2 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email" type="email" placeholder="E-posta Adresiniz">
          <p v-if="errors.email" class="text-xs italic text-red-500">{{ errors.email }}</p>
        </div>

        <!-- Şifre Alanı -->
        <div>
          <label class="block mb-1 text-sm font-bold text-gray-700" for="password">Şifre</label>
          <input v-model="user.password" @blur="validatePassword"
            class="w-full px-4 py-2 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password" type="password" placeholder="Şifreniz">
          <p v-if="errors.password" class="text-xs italic text-red-500">{{ errors.password }}</p>
        </div>

        <!-- Cinsiyet Alanı -->
        <div>
          <label class="block mb-1 text-sm font-bold text-gray-700" for="gender">Cinsiyet</label>
          <select v-model="user.gender" @change="validateGender"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="gender">
            <option disabled value="">Lütfen cinsiyetinizi seçin</option>
            <option value="Erkek">Erkek</option>
            <option value="Kadın">Kadın</option>
          </select>
          <p v-if="errors.gender" class="text-xs italic text-red-500">{{ errors.gender }}</p>
        </div>

        <!-- Kayıt Ol Butonu ve Hesabım Var Bölümü -->
        <div class="flex items-center justify-between mt-4">
          <button :disabled="isFormInvalid"
            class="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit">Kayıt Ol</button>
          <div class="text-right">
            <p class="text-sm text-gray-600">Zaten bir hesabım var?</p>
            <router-link to="/login" class="text-sm font-bold text-blue-500 hover:text-blue-800">Giriş Yap</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        gender: ''
      },
      errors: {
        username: null,
        email: null,
        password: null,
        gender: null,
        general: null
      }
    }
  },
  methods: {
    register() {
      this.validateGender();
      this.errors.general = null;
      if (this.isFormValid) {
        axios.post('http://localhost:5027/api/Auth/Register', this.user)
          .then(() => {
            this.$router.push('/login');
          }).catch(error => {
            this.errors.general = error.response && error.response.data ? error.response.data : 'Kayıt sırasında bir hata oluştu.';
          });
      }
    },
    validateUsername() {
      this.errors.username = this.user.username.length >= 3 ? null : 'Kullanıcı adı en az 3 karakter olmalıdır.';
    },
    validateEmail() {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.errors.email = pattern.test(this.user.email) ? null : 'Geçersiz e-posta adresi.';
    },
    validatePassword() {
      this.errors.password = this.user.password.length >= 6 ? null : 'Şifre en az 6 karakter olmalıdır.';
    },
    validateGender() {
      this.errors.gender = this.user.gender ? null : 'Lütfen cinsiyet seçimi yapınız.';
    }
  },
  computed: {
    isFormValid() {
      return !this.errors.username && !this.errors.email && !this.errors.password && !this.errors.gender;
    },
    isFormInvalid() {
      return !this.isFormValid;
    }
  }
}
</script>


