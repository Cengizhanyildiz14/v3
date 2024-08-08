<template>
  <div class="fixed top-0 left-0 z-50 w-full h-screen bg-gradient-to-r bg-[#002b36] overflow-hidden">
    <div class="flex items-center px-4 py-2">
      <!-- Duyuru Ekle butonu -->
      <button
        class="px-8 py-2 mx-3 text-lg font-bold text-white transition-colors bg-[#005f73] rounded-lg hover:bg-[#008d9e] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        @click="showForm = true; showList = false">Duyuru Ekle</button>

      <!-- Duyuru Listesi butonu -->
      <button
        class="px-8 py-2 mx-3 text-lg font-bold text-white transition-colors bg-[#005f73] rounded-lg hover:bg-[#008d9e] focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        @click="showList = true; showForm = false">Duyuru Listesi</button>
    </div>

    <!-- Duyuru formunu göster/gizle -->
    <div v-if="showForm" class="h-full overflow-y-auto">
      <DuyuruEklemeComponent />
    </div>

    <!-- Duyuru listesini göster/gizle -->
    <div v-if="showList" class="h-full pb-10 overflow-y-auto">
      <DuyuruListesiComponent />
    </div>
  </div>
</template>

<script>
import DuyuruEklemeComponent from '../components/DuyuruEklemeComponent.vue';
import DuyuruListesiComponent from '../components/DuyuruListesiComponent.vue';

export default {
  components: {
    DuyuruEklemeComponent,
    DuyuruListesiComponent
  },
  data() {
    return {
      showForm: false, // Duyuru ekleme formunun görünürlüğü
      showList: false, // Duyuru listesinin görünürlüğü
    };
  },
};
</script>
