<template>
  <div :class="['relative p-6 bg-white rounded-2xl shadow-xl transition-all duration-500 min-h-[200px]', isExpanded ? 'expanded' : 'collapsed']">
    <h3 class="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">{{ duyuru.title }}</h3>
    <div class="mb-4 overflow-hidden">
      <p class="text-lg text-gray-600 break-words">
        {{ isExpanded ? duyuru.content : duyuru.content.substring(0, 100) + '...' }}
      </p>
      <a v-if="!isExpanded && duyuru.content.length > 100"
         @click.prevent="toggle"
         class="inline-block px-4 py-2 mt-2 font-medium text-white transition duration-300 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700">
        Daha fazla oku &rarr;
      </a>
      <a v-else-if="isExpanded"
         @click.prevent="toggle"
         class="inline-block px-4 py-2 mt-2 font-medium text-white transition duration-300 bg-blue-500 rounded-md cursor-pointer hover:bg-blue-700">
        Kısalt &larr;
      </a>
    </div>
    <div class="absolute flex items-center space-x-4 bottom-3 right-6">
      <p class="font-semibold text-gray-700 shadow-md">{{ formattedDate }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duyuru: {
      type: Object,
      required: true,
    },
    isExpanded: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      const date = new Date(this.duyuru.createdAt);
      return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle', this.duyuru.id);
    },
  },
};
</script>

<style scoped>
.expanded {
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
}

.collapsed {
  max-height: 200px;
  overflow: hidden;
  position: relative;
  z-index: 0;
}
</style>
