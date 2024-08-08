<template>
  <div class="bottom-0 left-0 right-0 w-screen">
    <footer class="bg-[#002b36] text-white pb-4 pt-4 relative flex items-center justify-center">
      <div class="absolute top-0 left-0 w-1/3 h-full bg-no-repeat bg-contain opacity-50 bg-siluet-pattern"></div>
      <div class="z-10 space-y-2 text-center">
        <p class="text-sm"><i class="fa-regular fa-copyright"></i> 2024 Spor Randevu Sistemi. Tüm hakları saklıdır.</p>
        <p class="text-sm">Bizi sosyal medyada takip edin</p>
        <div class="flex flex-row space-x-4 place-content-center">
          <a href="https://twitter.com/cumunivkurumsal">
            <i class="fa-brands fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com/_cumhuriyetuniversitesi/">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://tr-tr.facebook.com/cumunivkurumsal/">
            <i class="fa-brands fa-facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>
