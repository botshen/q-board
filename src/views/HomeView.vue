<script setup lang="ts">
 import MessageBoard from '@/module/message/MessageBoard.vue'
import { onMounted, ref } from 'vue'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'
import { httpClient } from '@/shared/http-client';
import { useMeStore } from '@/hooks/use-me-store';
import { useMessageStore } from '@/module/message/message-api';

 const {
  isPlaying,
  initAudio,
  togglePlay
} = useAudioPlayer('/caibutou.mp3')
const { me, toggleMe } = useMeStore()
const { getMessage } = useMessageStore()

onMounted(() => {
  initAudio()
})

const messageDialog = ref<HTMLDialogElement>()

const onAddMessage = () => {
  messageDialog.value?.showModal()
}

const messageContent = ref('')
 const onSubmitMessage = async () => {
  if (!messageContent.value) return
  await httpClient.post('/messages', {
    content: messageContent.value,
    name: me.value.name,
  })
  messageContent.value = ''
  messageDialog.value?.close()
  getMessage()
}
</script>

<template>
  <main class="h-screen flex flex-col overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
    <div class="snowflakes" aria-hidden="true">
      <div v-for="n in 10" :key="n" class="snowflake">❄</div>
    </div>
    <div class="bg-white/90 backdrop-blur-sm z-20 py-1">
      <div class="mx-auto px-3">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <img
              src="/logo.webp"
              alt="QQ Icon"
              class="w-4 h-4 shadow-sm"
            />
            <span>好久不见</span>
            <img @click="toggleMe" :src="me.avatar" class="w-6 h-6 rounded-full" />
          </div>
          <button
            @click="onAddMessage"
            class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm shadow-sm hover:shadow-md transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            写留言
          </button>
          <div class="flex items-center gap-2 ml-auto">
            <button
              @click="togglePlay"
              class="relative flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 shadow-sm transition-all duration-200"
              :class="{ 'animate-button-pulse': !isPlaying }"
            >
              <div class="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  v-if="!isPlaying"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 text-white transition-transform duration-200"
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
            </button>

            <div v-if="isPlaying" class="music-waves-container">
              <div class="music-waves">
                <span class="bg-blue-500"></span>
                <span class="bg-blue-500"></span>
                <span class="bg-blue-500"></span>
                <span class="bg-blue-500"></span>
              </div>
            </div>
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
      class="p-0 bg-white rounded-lg shadow-xl backdrop:bg-black/50 open:animate-fade-in fixed top-0 mt-4"
    >
      <div class="w-[90vw] max-w-md">
        <div class="p-4">
          <form method="dialog" class="space-y-2" @submit.prevent="onSubmitMessage">
            <textarea
              rows="4"
              placeholder="写下你想说的话..."
              v-model="messageContent"
              class="p-2 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="messageDialog?.close()"
                class="px-4 py-2 text-sm text-gray-900"
              >
                再想想
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg"
              >
                留一句
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

@keyframes button-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.animate-button-pulse {
  animation: button-pulse 2s infinite;
}

dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

dialog {
  margin-top: 1rem;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>

