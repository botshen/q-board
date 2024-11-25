<script setup lang="ts">
 import MessageBoard from '@/module/message/MessageBoard.vue'
import { onMounted, ref } from 'vue'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

 const {
  isPlaying,
  initAudio,
  togglePlay
} = useAudioPlayer('/caibutou.mp3')

onMounted(() => {
  initAudio()
})

const messageDialog = ref<HTMLDialogElement>()

const onAddMessage = () => {
  messageDialog.value?.showModal()
}
</script>

<template>
  <main class="h-screen flex flex-col overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
    <div class="snowflakes" aria-hidden="true">
      <div v-for="n in 10" :key="n" class="snowflake">❄</div>
    </div>
    <div class="bg-white/90 backdrop-blur-sm z-20 py-1 ">
      <div class="  mx-auto px-3  ">
        <div class="flex items-center gap-3 pl-1">
          <img
            src="/logo.webp"
            alt="QQ Icon"
            class="w-4 h-4 shadow-sm"
          />
          <div class="text-[18px] font-medium text-gray-700">
            QQ 留言板 ⭐️
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="togglePlay"
              class="relative flex items-center gap-2 px-2 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 shadow-sm hover:shadow transition-all duration-200 group"
            >
              <div class="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  v-if="!isPlaying"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3.5 h-3.5 text-white group-hover:scale-105 transition-transform duration-200"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3.5 h-3.5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/>
                </svg>
              </div>
              <span
                v-if="!isPlaying"
                class="absolute -right-1 -top-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"
              ></span>
              <span
                v-if="!isPlaying"
                class="absolute -right-1 -top-1 w-3 h-3 bg-blue-500 rounded-full"
              ></span>
            </button>

            <div v-if="isPlaying" class="music-waves-container overflow-visible">
              <div class="music-waves">
                <span class="bg-blue-500"></span>
                <span class="bg-blue-500"></span>
                <span class="bg-blue-500"></span>
                <span class="bg-blue-500"></span>
              </div>
            </div>
          </div>
          <div class="text-sm ml-auto text-gray-500 hover:text-gray-700" @click="onAddMessage">
            留个言吧~~~
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="mx-auto bg-white/90 backdrop-blur-sm relative z-10 p-2 pt-0 shadow-lg mt-0">
        <div class="border-t border-gray-200/50 pt-2">
          <MessageBoard />
        </div>
      </div>
    </div>

    <dialog
      ref="messageDialog"
      class="p-0 bg-white rounded-lg shadow-xl backdrop:bg-black/50 open:animate-fade-in"
    >
      <div class="w-[90vw] max-w-md">
        <div class="p-4">
          <form method="dialog" class="space-y-4">
            <div>
              <textarea
                rows="4"
                placeholder="写下你想说的话..."
                class=" p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              ></textarea>
            </div>
            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="messageDialog?.close()"
                class="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                取消
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                发送
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
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

.music-waves-container {
  @apply h-6 flex items-center;
  width: 16px;
}

.music-waves {
  @apply flex items-end gap-[2px];
  height: 16px;
}

.music-waves span {
  @apply w-[2px] rounded-full;
  height: 4px;
  opacity: 0.7;
  animation: wave 1s ease-in-out infinite;
  will-change: height;
}

.music-waves span:nth-child(1) {
  animation-delay: 0.0s;
}

.music-waves span:nth-child(2) {
  animation-delay: 0.2s;
}

.music-waves span:nth-child(3) {
  animation-delay: 0.4s;
}

.music-waves span:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes wave {
  0%, 100% {
    height: 4px;
  }
  50% {
    height: 16px;
  }
}

@keyframes buttonPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
  }
  70% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.button-initial-animation {
  animation: buttonPulse 2s infinite;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>

