<template>
    <div class="max-w-4xl py-10 mx-auto">
      <!-- Güncelleme modalı -->
      <div v-if="activeDuyuru" class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
        <div class="p-5 bg-white rounded-lg">
          <h2 class="text-lg font-bold">Duyuru Güncelle</h2>
          <form @submit.prevent="guncelle(activeDuyuru.id)">
            <input type="text" v-model="activeDuyuru.title" class="w-full p-2 my-2 border rounded"
                   placeholder="Başlık" required>
            <textarea v-model="activeDuyuru.content" class="w-full p-2 my-2 border rounded"
                      placeholder="İçerik" required></textarea>
            <div class="space-x-2 text-right">
              <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Güncelle</button>
              <button @click="activeDuyuru = null" class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600">İptal</button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Mevcut duyuruların listesi -->
      <ul v-if="duyurular.length" class="space-y-4">
        <!-- Her bir duyuru için bir liste elemanı -->
        <li v-for="duyuru in duyurular" :key="duyuru.id" 
            class="p-5 transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg">
          <h3 class="text-xl font-semibold text-gray-900">{{ duyuru.title }}</h3>
          <p class="text-gray-700">{{ duyuru.content }}</p>
          <div class="flex justify-end mt-4 space-x-2">
            <button @click="sil(duyuru.id)" 
                    class="px-4 py-2 text-white transition-colors bg-red-500 rounded hover:bg-red-600">
              Sil
            </button>
            <button @click="guncellemeModalAc(duyuru)" 
                    class="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600">
              Güncelle
            </button>
          </div>
        </li>
      </ul>
      <p v-else class="text-center text-gray-500">Duyuru bulunamadı.</p>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import Swal from 'sweetalert2';  // SweetAlert2 kütüphanesini import et

export default {
  data() {
    return {
      duyurular: [],
      activeDuyuru: null,  // Güncellenecek duyuru için aktif duyuru objesi
    };
  },
  methods: {
    duyurulariCek() {
      axios.get('http://localhost:5027/api/Duyuru/TumDuyurulariGetir')
        .then(response => {
          this.duyurular = response.data;
        })
        .catch(error => {
          console.error('Duyurular yüklenirken bir hata oluştu:', error);
        });
    },
    sil(id) {
      // SweetAlert2 ile silme onay diyalogu
      Swal.fire({
        title: 'Emin misiniz?',
        text: "Bu duyuruyu silmek istediğinize emin misiniz?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, sil!',
        cancelButtonText: 'İptal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:5027/api/Duyuru/${id}`)
            .then(() => {
              this.duyurular = this.duyurular.filter(duyuru => duyuru.id !== id);
              Swal.fire(
                'Silindi!',
                'Duyuru başarıyla silindi.',
                'success'
              )
            })
            .catch(error => {
              console.error('Duyuru silinirken bir hata oluştu:', error);
              Swal.fire(
                'Hata!',
                'Duyuru silinemedi: ' + error.message,
                'error'
              )
            });
        }
      });
    },
    guncellemeModalAc(duyuru) {
      this.activeDuyuru = { ...duyuru };  // Duyuru objesini aktif duyuru olarak ayarla
    },
    guncelle(id) {
      axios.put(`http://localhost:5027/api/Duyuru/${id}`, this.activeDuyuru)
        .then(() => {
          this.duyurulariCek();  // Başarılı güncelleme sonrası duyuruları tekrar çek
          this.activeDuyuru = null;  // Modalı kapat
        })
        .catch(error => {
          console.error('Duyuru güncellenirken bir hata oluştu:', error);
        });
    }
  },
  created() {
    this.duyurulariCek();
  }
}
</script>



  