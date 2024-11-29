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
  <main class="h-screen flex flex-col overflow-hidden bg-[#f8f8f8] from-gray-100 to-gray-200">
    <div class="snowflakes" aria-hidden="true">
      <div v-for="n in 30" :key="n" class="snowflake">❄</div>
    </div>
    <div class="  backdrop-blur-sm z-20 py-1">
      <div class="mx-auto px-4">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <img
              src="/logo.webp"
              alt="QQ Icon"
              class="w-6 h-6"
            />
            <span>好久不见</span>
            <img @click="toggleMe" :src="me.avatar" class="w-6 h-6 rounded-full" />
          </div>
          <button
            @click="onAddMessage"
            class="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-gray-100 text-gray-600 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span class="text-sm">留一句吧</span>
          </button>
          <div class="flex items-center gap-2 ml-auto">
            <button
              @click="togglePlay"
              class="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#31c27c]/10 shadow-sm transition-all duration-200"
              :class="{ 'animate-button-pulse': !isPlaying }"
            >
              <div class="w-3.5 h-3.5 rounded-full bg-[#31c27c] flex items-center justify-center">
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
                <span class="bg-[#31c27c]"></span>
                <span class="bg-[#31c27c]"></span>
                <span class="bg-[#31c27c]"></span>
                <span class="bg-[#31c27c]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div class="mx-auto  backdrop-blur-sm relative z-10 p-4 pt-0   mt-0">

          <MessageBoard />

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
              placeholder="来都来了,不说两句吗?"
              v-model="messageContent"
              class="p-2 w-full rounded-lg border !border-gray-200 focus:border-gray-400 focus:ring-gray-400/30"
            ></textarea>
            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="messageDialog?.close()"
                class="px-4 py-2 text-sm text-gray-600"
              >
                下次一定
              </button>
              <button
                type="submit"
                class="px-4 py-2 text-sm text-gray-600 rounded-lg border border-gray-200"
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
  top: -10vh;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 50;
}

.snowflake {
  @apply fixed text-blue-400/40 drop-shadow-sm text-xl;
  filter: drop-shadow(0 0 3px rgba(96, 165, 250, 0.4));
  animation: snowfall linear infinite;
  will-change: transform;
}

.snowflake:nth-child(1) { left: 7%; animation-duration: 12s; animation-delay: -1.5s; }
.snowflake:nth-child(2) { left: 23%; animation-duration: 14.5s; animation-delay: -2s; }
.snowflake:nth-child(3) { left: 35%; animation-duration: 11s; animation-delay: -3.5s; }
.snowflake:nth-child(4) { left: 42%; animation-duration: 15.5s; animation-delay: -2.8s; }
.snowflake:nth-child(5) { left: 58%; animation-duration: 13.5s; animation-delay: -4s; }
.snowflake:nth-child(6) { left: 64%; animation-duration: 12.8s; animation-delay: -1.2s; }
.snowflake:nth-child(7) { left: 75%; animation-duration: 14.2s; animation-delay: -3.2s; }
.snowflake:nth-child(8) { left: 82%; animation-duration: 13.8s; animation-delay: -2.4s; }
.snowflake:nth-child(9) { left: 88%; animation-duration: 11.5s; animation-delay: -3.8s; }
.snowflake:nth-child(10) { left: 93%; animation-duration: 15.2s; animation-delay: -2.2s; }
.snowflake:nth-child(11) { left: 15%; animation-duration: 13.2s; animation-delay: -1.8s; }
.snowflake:nth-child(12) { left: 28%; animation-duration: 14.8s; animation-delay: -3.3s; }
.snowflake:nth-child(13) { left: 45%; animation-duration: 12.5s; animation-delay: -2.5s; }
.snowflake:nth-child(14) { left: 52%; animation-duration: 13.7s; animation-delay: -4.2s; }
.snowflake:nth-child(15) { left: 68%; animation-duration: 11.8s; animation-delay: -3.7s; }
.snowflake:nth-child(16) { left: 73%; animation-duration: 15.8s; animation-delay: -1.9s; }
.snowflake:nth-child(17) { left: 85%; animation-duration: 12.9s; animation-delay: -2.8s; }
.snowflake:nth-child(18) { left: 91%; animation-duration: 14.3s; animation-delay: -3.4s; }
.snowflake:nth-child(19) { left: 95%; animation-duration: 13.4s; animation-delay: -2.7s; }
.snowflake:nth-child(20) { left: 97%; animation-duration: 12.2s; animation-delay: -4.1s; }
.snowflake:nth-child(21) { left: 12%; animation-duration: 13.1s; animation-delay: -2.3s; }
.snowflake:nth-child(22) { left: 33%; animation-duration: 14.7s; animation-delay: -3.1s; }
.snowflake:nth-child(23) { left: 48%; animation-duration: 12.3s; animation-delay: -1.7s; }
.snowflake:nth-child(24) { left: 62%; animation-duration: 15.4s; animation-delay: -2.9s; }
.snowflake:nth-child(25) { left: 77%; animation-duration: 13.9s; animation-delay: -3.5s; }
.snowflake:nth-child(26) { left: 89%; animation-duration: 12.7s; animation-delay: -1.4s; }
.snowflake:nth-child(27) { left: 18%; animation-duration: 14.1s; animation-delay: -2.6s; }
.snowflake:nth-child(28) { left: 37%; animation-duration: 13.3s; animation-delay: -3.9s; }
.snowflake:nth-child(29) { left: 56%; animation-duration: 15.6s; animation-delay: -2.1s; }
.snowflake:nth-child(30) { left: 81%; animation-duration: 12.4s; animation-delay: -3.6s; }

@keyframes snowfall {
  0% {
    transform: translateY(0) rotate(0deg) scale(0.8);
    opacity: 0.9;
  }
  50% {
    transform: translateY(50vh) rotate(180deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) rotate(360deg) scale(0.8);
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
    box-shadow: 0 0 0 0 rgba(46, 213, 115, 0.3);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 8px rgba(46, 213, 115, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(46, 213, 115, 0);
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

/* 添加以下CSS来隐藏滚动条 */
.flex-1.overflow-y-auto {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.flex-1.overflow-y-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
</style>

