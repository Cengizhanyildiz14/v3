<template>
    <div class="flex flex-col items-center justify-center h-screen bg-[#002b36] space-y-6">
        <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h2 class="mb-6 text-2xl font-semibold text-center">Şifreni Sıfırla</h2>
            <form @submit.prevent="sendResetPasswordRequest" class="space-y-6">
                <div>
                    <input v-model="email" @blur="validateEmail"
                        class="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        type="email" placeholder="E-posta Adresini Gir">
                    <p v-if="emailError" class="text-xs italic text-red-500">{{ emailError }}</p>
                </div>
                <button :disabled="!isValidEmail"
                    class="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type="submit">
                    Şifre Sıfırlama Bağlantısı Gönder
                </button>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            emailError: null
        };
    },
    computed: {
        isValidEmail() {
            return this.emailError === null && this.email !== '';
        }
    },
    methods: {
        validateEmail() {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.emailError = re.test(this.email) ? null : 'Geçerli bir e-posta adresi girin.';
        },
        sendResetPasswordRequest() {
            if (this.isValidEmail) {
                axios.post('http://localhost:5027/api/Auth/forgot-password', { email: this.email })
                    .then(() => {
                        alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
                    })
                    .catch(error => {
                        console.error('Error sending reset password email:', error);
                        alert('Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu.');
                    });
            }
        }
    }
}
</script>
  