<template>
  <div class="flex items-center justify-center min-h-screen bg-[#002b36]">
      <div class="w-full max-w-lg p-5 bg-white rounded shadow-lg">
          <h2 class="mb-5 text-xl font-bold text-center text-gray-800">Yeni Duyuru Ekle</h2>
          <form @submit.prevent="duyuruEkle">
              <div class="mb-4">
                  <label for="title" class="block mb-2 text-sm font-bold text-gray-700">Başlık:</label>
                  <input type="text" v-model="Duyuru.title" id="title"
                      class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      required>
              </div>
              <div class="mb-4">
                  <label for="content" class="block mb-2 text-sm font-bold text-gray-700">İçerik:</label>
                  <textarea v-model="Duyuru.content" id="content" rows="4"
                      class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      required></textarea>
              </div>
              <div class="mb-4">
                  <label for="date" class="block mb-2 text-sm font-bold text-gray-700">Tarih:</label>
                  <input type="date" v-model="Duyuru.date" id="date"
                      class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      required>
              </div>
              <div class="flex justify-center">
                  <button type="submit"
                      class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">Ekle</button>
              </div>
          </form>
      </div>
  </div>
</template>

  
<script>
import axios from 'axios';
import { toRaw } from 'vue'; 

export default {
  data() {
    return {
      Duyuru: {
        title: '',
        content: '',
        date: '',
      },
    };
  },
  methods: {
    async duyuruEkle() {
      try {
        const duyuruData = toRaw(this.Duyuru);
        const response = await axios.post('http://localhost:5027/api/Duyuru/DuyuruEkle', duyuruData);
        console.log("Sunucuya eklenen duyuru:", response.data);
        // İstek başarılı olduktan sonra formu sıfırla
        this.Duyuru = { title: '', content: '', date: '' };
      } catch (error) {
        console.error("Sunucuya eklenen duyuru hatası:", error.response);
      }
    },
  },
};
</script>
  