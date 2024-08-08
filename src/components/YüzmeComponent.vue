<template>
  <div class="relative flex flex-col px-16 bg-no-repeat bg-yüzme-pattern bg-full bg-center-center">
    <div class="relative p-6 text-2xl font-extrabold text-center text-gray-800 bg-blue-200 rounded-lg shadow-md">
      {{ activityName }}
      <button @click="toggleMusic"
        class="absolute px-4 py-2 transition-transform duration-300 transform -translate-y-1/2 rounded top-1/2 right-4 hover:scale-125"
        v-html="isPlaying ? '<i class=\'fa-solid fa-pause\'></i>' : '<i class=\'fa-solid fa-play\'></i>'">
      </button>
    </div>
    <div class="flex items-center justify-between p-2 text-center bg-gray-200">
      <button @click="goToPreviousDay" class="p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-blue-100">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <div class="flex flex-grow justify-evenly">
        <div v-for="day in days" :key="day.date"
          :class="['flex flex-col items-center justify-center border rounded-lg shadow-md p-4 mx-1 cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105', { 'bg-pink-200': day.womenOnly, 'bg-blue-200': selectedDay === day.date && !day.womenOnly, 'bg-white': selectedDay !== day.date }]"
          @click="selectDay(day.date)">
          <div class="text-lg font-bold text-gray-800">
            {{ day.name }}
          </div>
          <div class="text-sm text-gray-600">
            {{ day.date }}
          </div>
          <i v-if="day.womenOnly" class="mt-2 text-pink-500 fa-solid fa-venus"></i>
        </div>
      </div>
      <button @click="goToNextDay" class="p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-blue-100">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
    <div class="grid grid-cols-1 gap-2 mt-2">
      <div v-for="time in times" :key="time"
        :class="['w-1/2 p-2 text-center rounded shadow-md cursor-pointer mx-auto hover:bg-blue-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105', { 'bg-blue-100': selectedTime === time, 'bg-white': selectedTime !== time }]"
        @click="bookAppointment(time)">
        <span class="text-lg font-medium text-gray-700">{{ time }}</span>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <button class="items-center px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
        @click="confirmAppointment">
        Randevuyu Onayla
      </button>
    </div>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center w-full h-full bg-gray-600 bg-opacity-50">
      <div class="w-full max-w-sm bg-white rounded-lg shadow-lg">
        <div class="p-5 text-center">
          <h3 class="mb-4 text-lg font-semibold">{{ modalTitle }}</h3>
          <pre class="mb-4 text-center break-words whitespace-pre-wrap">{{ modalContent }}</pre>
          <div v-if="appointmentSuccess" class="flex justify-center mb-4">
            <qrcode-vue :value="qrCodeUrl" :size="200"></qrcode-vue>
          </div>
          <router-link v-if="!isLoggedIn" to="/login"
            class="inline-block px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none">
            Giriş Yap
          </router-link>
          <button class="px-4 py-2 mt-4 ml-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            @click="closeModal">
            Tamam
          </button>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.718446323613!2d37.04572777597686!3d39.72350977155952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4079556931024473%3A0xa39644ba82d209f7!2zVcSeVVIgw4fEsEZUw4fEsCBTUE9SIEtPTVBMRUtTxLA!5e0!3m2!1str!2str!4v1717086437292!5m2!1str!2str"
        class="w-full h-60" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <audio ref="audioPlayer" src="/music/içimdeki-bahar.mp3" loop></audio>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';
import tokenService from '../Services/tokenService';
import { format, addDays, startOfWeek } from 'date-fns';
import { tr } from 'date-fns/locale';

export default {
  components: {
    QrcodeVue,
  },
  data() {
    return {
      days: [],
      activityName: '',
      times: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
      selectedDay: '',
      selectedTime: '',
      showModal: false,
      modalTitle: '',
      modalContent: '',
      qrCodeValue: '',
      qrCodeUrl: '',
      isLoggedIn: false,
      appointmentSuccess: false,
      userProfile: null,
      isPlaying: false,
    };
  },
  mounted() {
    this.isLoggedIn = tokenService.checkUserStatus();
    this.fillDaysWithCurrentWeek();
    this.fetchUserProfile();
    this.toggleMusic(); // Sayfa yüklendiğinde müzik çalmaya başlar
  },
  created() {
    this.determineActivityName();
  },
  methods: {
    determineActivityName() {
      const path = this.$route.path.split('/');
      const activity = path.pop();
      this.activityName = activity.charAt(0).toUpperCase() + activity.slice(1);
    },
    fillDaysWithCurrentWeek() {
      const now = new Date();
      const start = startOfWeek(now, { weekStartsOn: 1 });
      this.days = [];
      for (let i = 0; i < 7; i++) {
        const dayDate = addDays(start, i);
        const isWomenOnly = (i === 1 || i === 2); // Salı ve Çarşamba günleri kadınlar için ayrıldı
        this.days.push({
          date: format(dayDate, 'dd.MM.yyyy'),
          name: format(dayDate, 'EEEE', { locale: tr }),
          womenOnly: isWomenOnly
        });
      }
      const foundDay = this.days.find(day => new Date(day.date.split('.').reverse().join('-')) >= now);
      if (foundDay) {
        this.selectedDay = foundDay.date;
      }
    },
    selectDay(day) {
      this.selectedDay = day;
    },
    bookAppointment(time) {
      this.selectedTime = time;
    },
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
      } catch (error) {
        console.error("Kullanıcı profil verileri alınırken hata oluştu:", error);
      }
    },
    confirmAppointment() {
      if (!this.isLoggedIn) {
        this.showModalWithContent("Giriş Yapmanız Gerekli", "Randevu oluşturmak için lütfen önce giriş yapın.");
        return;
      }

      const dayIndex = this.days.findIndex(day => day.date === this.selectedDay);
      const userGender = this.userProfile?.gender;

      if ((dayIndex === 1 || dayIndex === 2) && userGender !== 'Kadın') {
        this.showModalWithContent("Rezervasyon Uyarısı", "Bu günlerde sadece kadınlar için rezervasyon yapılabilmektedir.");
        return;
      }

      if (!this.selectedDay || !this.selectedTime) {
        this.showModalWithContent("Uyarı", "Lütfen geçerli bir gün ve zaman dilimi seçiniz.");
        return;
      }

      const selectedDayParsed = new Date(this.selectedDay.split('.').reverse().join('-'));
      const selectedTimeSplit = this.selectedTime.split(':');
      const selectedAppointmentDate = new Date(selectedDayParsed.getFullYear(), selectedDayParsed.getMonth(), selectedDayParsed.getDate(), selectedTimeSplit[0], selectedTimeSplit[1]);
      const now = new Date();

      if (selectedAppointmentDate <= now) {
        this.showModalWithContent("Uyarı", "Geçmiş bir zaman dilimi için randevu oluşturamazsınız.");
        return;
      }

      const userToken = localStorage.getItem('userToken');
      const userID = tokenService.getUserId(userToken);

      const appointmentData = {
        userID: userID,
        date: format(selectedDayParsed, 'yyyy-MM-dd'),
        time: this.selectedTime,
        activityName: this.activityName
      };

      axios.post('http://localhost:5027/api/Appointment/RandevuOlustur', appointmentData)
        .then(() => {
          this.appointmentSuccess = true;
          this.qrCodeUrl = this.qrCodeValue; // Sadece burada QR kodu atanıyor
          this.showModalWithContent("Randevu Başarılı", `Randevunuz başarıyla oluşturuldu.\nTarih: ${this.selectedDay}\nSaat: ${this.selectedTime}`);
        })
        .catch(error => {
          this.appointmentSuccess = false;
          let errorMessage = "Randevu oluşturulurken bir problem oluştu, lütfen tekrar deneyin.";
          if (error.response && error.response.data) {
            errorMessage = error.response.data;
          }
          this.showModalWithContent("Randevu Hatası", errorMessage);
        });
    },
    showModalWithContent(title, content) {
      this.modalTitle = title;
      this.modalContent = content;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.qrCodeUrl = ''; // Modal kapatıldığında QR kod URL'sini sıfırla
      this.appointmentSuccess = false; // Modal kapatıldığında appointmentSuccess değerini sıfırla
    },
    goToPreviousDay() {
      const currentIndex = this.days.findIndex(day => day.date === this.selectedDay);
      if (currentIndex > 0) {
        this.selectedDay = this.days[currentIndex - 1].date;
      }
    },
    goToNextDay() {
      const currentIndex = this.days.findIndex(day => day.date === this.selectedDay);
      if (currentIndex < this.days.length - 1) {
        this.selectedDay = this.days[currentIndex + 1].date;
      }
    },
    toggleMusic() {
      const audio = this.$refs.audioPlayer;
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    }
  }
};
</script>
