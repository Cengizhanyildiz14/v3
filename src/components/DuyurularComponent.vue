<template>
  <div>
    <section class="bg-[#fdf9ee] min-h-screen flex flex-col relative">
      <div class="relative flex-grow pt-5 pb-20">
        <h2 class="mb-10 text-4xl font-bold text-center text-gray-800">Duyurular</h2>
        <div class="relative mx-4">
          <div class="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <DuyuruComponent
              v-for="duyuru in duyurular"
              :key="duyuru.id"
              :duyuru="duyuru"
              :isExpanded="expandedDuyuruId === duyuru.id"
              @toggle="toggleExpand(duyuru.id)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DuyuruComponent from '@/components/DuyuruComponent.vue'
import axios from 'axios'

export default {
  components: {
    DuyuruComponent,
  },
  data() {
    return {
      duyurular: [],
      expandedDuyuruId: null,
    };
  },
  created() {
    this.fetchDuyurular();
  },
  methods: {
    fetchDuyurular() {
      axios
        .get('http://localhost:5027/api/Duyuru/TumDuyurulariGetir')
        .then((response) => {
          this.duyurular = response.data;
        })
        .catch((error) => {
          console.error('Duyurular yüklenirken bir hata oluştu:', error);
        });
    },
    toggleExpand(id) {
      this.expandedDuyuruId = this.expandedDuyuruId === id ? null : id;
    },
  },
};
</script>










  