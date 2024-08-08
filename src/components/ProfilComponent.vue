<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#002b36]">
    <div class="mb-8 text-center">
      <router-link to="/">
        <img src="@/assets/SivasCumhuriyetÜniLogo.png" alt="Sivas Cumhuriyet Üniversitesi Logo" class="w-32 h-32 mx-auto mb-2">
      </router-link>
      <p class="text-2xl font-semibold text-white">SİVAS<br>CUMHURİYET ÜNİVERSİTESİ<br><span class="text-lg italic">Gelenekten Geleceğe...</span></p>
    </div>
    <div class="max-w-full p-6 mx-auto mt-10 text-center bg-white border border-gray-300 rounded-lg shadow-lg" v-if="userProfile">
      <h1 class="mb-6 text-3xl font-bold text-center text-gray-800">Kullanıcı Profili</h1>
      <div class="mb-4">
        <p class="text-lg"><span class="font-semibold text-gray-700">Kullanıcı Adı:</span> {{ userProfile.userName }}</p>
        <p class="text-lg"><span class="font-semibold text-gray-700">Email:</span> {{ userProfile.email }}</p>
        <p class="text-lg"><span class="font-semibold text-gray-700">Cinsiyet:</span> {{ userProfile.gender }}</p>
      </div>
      <div class="mt-8" v-if="userProfile.appointments && userProfile.appointments.length">
        <h2 class="mb-4 text-2xl font-semibold text-center text-gray-800">Aktif Randevular</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <div v-for="appointment in userProfile.appointments" :key="appointment.id"
               class="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg shadow bg-gray-50 w-52">
            <div class="mb-2 text-lg font-semibold text-gray-800">{{ appointment.activityName }}</div>
            <div class="mb-4 text-gray-600">{{ formatDate(appointment.date) }} - {{ appointment.time }}</div>
            <qrcode-vue :value="appointment.qrCodeUrl" :size="128"></qrcode-vue>
            <button class="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                    @click="cancelAppointment(appointment.id)">İptal Et</button>
          </div>
        </div>
      </div>
      <div v-else class="mt-8 text-lg text-center text-gray-600">
        Aktif randevu yok.
      </div>
    </div>
    <div v-else class="flex items-center justify-center h-screen">
      <div class="text-xl text-gray-600">Kullanıcı bilgileri yükleniyor...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';
import tokenService from '@/Services/tokenService';

export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      userProfile: null
    };
  },
  methods: {
    async fetchUserProfile() {
      const userToken = localStorage.getItem('userToken');
      if (!userToken || tokenService.isTokenExpired(userToken)) {
        console.error("Token geçersiz veya süresi dolmuş.");
        return;
      }

      const userId = tokenService.getUserId(userToken);
      try {
        const response = await axios.get(`http://localhost:5027/api/user/${userId}`);
        this.userProfile = response.data;
        console.log(this.userProfile)
      } catch (error) {
        console.error("Kullanıcı profil verileri alınırken hata oluştu:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    async cancelAppointment(appointmentId) {
      try {
        const response = await axios.delete(`http://localhost:5027/api/appointment/${appointmentId}`);
        console.log("Randevu başarıyla iptal edildi:", response);
        this.fetchUserProfile(); 
      } catch (error) {
        console.error("Randevu iptali sırasında hata oluştu:", error);
      }
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
}
</script>
