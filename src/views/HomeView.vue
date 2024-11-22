<script setup lang="ts">
import MessageBoard from '@/components/MessageBoard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const onAbout = () => {
  router.push('/about')
}
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
    <div class="snowflakes" aria-hidden="true">
      <div v-for="n in 10" :key="n" class="snowflake">❄</div>
    </div>

    <div class="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm relative z-10 p-3 rounded-lg rounded-t-none shadow-lg">
      <div class="flex items-center gap-3 mb-2 pl-1">
        <img
          src="/logo.webp"
          alt="QQ Icon"
          class="w-8 h-8 rounded-lg shadow-sm"
        />
        <div class="text-xl font-medium text-gray-700">
          QQ 留言板 ⭐️
        </div>
        <div class="text-sm ml-auto text-gray-500 hover:text-gray-700" @click="onAbout">
          关于
        </div>
      </div>
      <div class="border-t border-gray-200/50 pt-3">
        <MessageBoard />
      </div>
    </div>
  </main>
</template>

<style scoped>
.snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 50;
}

.snowflake {
  @apply fixed text-blue-400 drop-shadow-sm;
  filter: drop-shadow(0 0 2px rgba(96, 165, 250, 0.5));
  animation: snowfall linear infinite;
}


.snowflake:nth-child(1) { left: 10%; animation-duration: 10s; animation-delay: -2s; }
.snowflake:nth-child(2) { left: 20%; animation-duration: 12s; animation-delay: -1s; }
.snowflake:nth-child(3) { left: 30%; animation-duration: 8s; animation-delay: -3s; }
.snowflake:nth-child(4) { left: 40%; animation-duration: 15s; animation-delay: -4s; }
.snowflake:nth-child(5) { left: 50%; animation-duration: 11s; animation-delay: -5s; }
.snowflake:nth-child(6) { left: 60%; animation-duration: 9s; animation-delay: -1.5s; }
.snowflake:nth-child(7) { left: 70%; animation-duration: 13s; animation-delay: -2.5s; }
.snowflake:nth-child(8) { left: 80%; animation-duration: 14s; animation-delay: -3.5s; }
.snowflake:nth-child(9) { left: 90%; animation-duration: 10s; animation-delay: -4.5s; }
.snowflake:nth-child(10) { left: 95%; animation-duration: 16s; animation-delay: -2.8s; }

@keyframes snowfall {
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>

