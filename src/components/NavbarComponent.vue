<template>
  <div class="sticky top-0 left-0 right-0 z-50 w-full">
    <nav class="bg-[#002b36] flex flex-row items-center justify-between px-20 py-3.5 text-white">
      <div class="flex items-center space-x-4">
        <router-link to="/">
          <img src="@/assets/SivasCumhuriyetÜniLogo.png" alt="Sivas Cumhuriyet Üniversitesi Logosu" class="w-20 h-20">
        </router-link>
        <!-- Dropdown Menü -->
        <div class="relative group">
          <button class="px-5 py-2 rounded-lg bg-[#005f73] font-bold text-lg hover:bg-[#008d9e] transition-colors">
            Sporlar
          </button>
          <div class="absolute left-0 hidden w-48 bg-[#005f73] rounded-lg shadow-lg group-hover:block">
            <router-link to="/futbol" class="block px-5 py-3 rounded-lg hover:bg-[#008d9e] transition-colors">
              Futbol
            </router-link>
            <router-link to="/yüzme" class="block px-5 py-3 rounded-lg hover:bg-[#008d9e] transition-colors">
              Yüzme
            </router-link>
            <router-link to="/voleybol" class="block px-5 py-3 rounded-lg hover:bg-[#008d9e] transition-colors">
              Voleybol
            </router-link>
            <!-- Diğer spor dalları -->
          </div>
        </div>
        <!-- Dropdown Menü Bitişi -->
      </div>
      <div v-if="isLoggedIn" class="flex-1 text-lg font-semibold text-center">
        Hoşgeldiniz, {{ userName }}! Sizi aramızda görmek harika. Keyifli bir deneyim geçirmenizi dileriz.
        <div class="mt-4 italic">
          "Ben sporcunun zeki, çevik ve ahlaklısını severim." - Mustafa Kemal Atatürk
        </div>
        <!-- İmza için ayrı bir div oluştur ve içeriği merkezle -->
        <div class="flex justify-center mt-2">
          <img src="@/assets/AtaturkSignature.png" alt="Atatürk İmzası" class="w-32 h-auto">
        </div>
      </div>
      <!-- Sağ taraftaki kullanıcı işlemleri -->
      <div class="flex items-center space-x-4">
        <router-link v-if="isLoggedIn && !isAdmin" to="/profil" key="profil"
          class="px-5 py-2 rounded-lg bg-[#005f73] font-bold text-lg hover:bg-[#008d9e] transition-colors">
          Profil
        </router-link>
        <button v-if="isLoggedIn" @click="logout" key="logout"
          class="px-8 py-2 rounded-lg bg-[#005f73] font-bold text-lg hover:bg-[#008d9e] transition-colors">
          Çıkış Yap
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
        <!-- Kullanıcı giriş yapmamışsa görüntülenecek öğeler -->
        <router-link v-if="!isLoggedIn" to="/login" key="login"
          class="px-8 py-2 rounded-lg bg-[#005f73] font-bold text-lg hover:bg-[#008d9e] transition-colors">
          Giriş Yap
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </router-link>
        <router-link v-if="!isLoggedIn" to="/register" key="register"
          class="px-5 py-2 rounded-lg bg-[#005f73] font-bold text-lg hover:bg-[#008d9e] transition-colors">
          Kayıt Ol
        </router-link>
        <router-link v-if="isAdmin" to="/admin"
          class="px-5 py-2 rounded-lg bg-[#005f73] font-bold text-lg hover:bg-[#008d9e] transition-colors">
          Admin Paneli
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import tokenService from '../Services/tokenService';

export default {
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      userName: "",
      isDropdownOpen: false
    }
  },
  created() {
    this.checkUserStatus();
  },
  methods: {
    openDropdown() {
      this.isDropdownOpen = true;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    logout() {
      localStorage.removeItem('userToken');
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push('/');
    },
    checkUserStatus() {
      const userToken = localStorage.getItem('userToken');
      this.isLoggedIn = !!userToken;

      if (userToken) {
        const decoded = tokenService.decodeToken(userToken);
        this.isAdmin = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin';
        this.userName = tokenService.getUserFullName(userToken);
        if (tokenService.isTokenExpired(userToken)) {
          this.logout();
        }
      }
    }
  }
}
</script>
