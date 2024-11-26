<script setup lang="ts">
import { formatTimestamp } from '@/shared/data-helper';
import { useMessageStore } from '@/module/message/message-api';
import { useMeStore } from '@/hooks/use-me-store';
import { ref, onMounted } from 'vue'
import { httpClient } from '@/shared/http-client';

const content = ref('')
const commentContent = ref('')
const activeMessageId = ref<string | null | number>(null)
const isDialogOpen = ref(false)
const {me} = useMeStore()
const { messages, getMessage } = useMessageStore()

onMounted(() => {
  getMessage()
 })



const createMessage = () => {
  isDialogOpen.value = false
  content.value = ''
}

const createComment = async (messageId: string | number) => {
  activeMessageId.value = null
  await httpClient.post(`/messages/${messageId}/comments`, {
    comment: {
      content: commentContent.value,
    },
    name: me.value.name,
  })
  getMessage()
  commentContent.value = ''
}

const toggleComment = (messageId: string | number) => {
  activeMessageId.value = activeMessageId.value === messageId ? null : messageId
}
</script>

<template>
  <div class="w-full mx-auto">
    <!-- 发布按钮 -->
    <div class="flex justify-center mb-4" v-if="false">
      <button @click="isDialogOpen = true"
        class="w-96 px-4 py-2.5 rounded-full bg-amber-900 text-amber-50 text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:bg-amber-800">
        发布新留言
      </button>
    </div>

    <!-- 留言对话框 -->
    <dialog v-if="isDialogOpen" class="fixed inset-0 w-[400px] max-w-2xl m-auto rounded-2xl p-0 bg-transparent">
      <form @submit.prevent="createMessage">
        <div class="dialog-header">
          <h3>发布新留言</h3>
          <button type="button" @click="isDialogOpen = false">✕</button>
        </div>
        <textarea
          v-model="content"
          placeholder="写下你的留言..."
        />
        <button type="submit">
          发布留言
        </button>
      </form>
    </dialog>


    <!-- 留言列表 -->
    <div class="space-y-3">
      <div v-for="(message, index) in messages"
           :key="index"
           class="bg-gray-50/95 p-4 rounded-lg shadow-md border border-gray-200/80 transition-all hover:shadow-lg">
        <div class="flex gap-3 items-start">
          <img :src="message.author?.avatar"
               alt="QQ Icon"
               class="w-7 h-7 rounded-full ring-1 ring-gray-300 p-0.5" />
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-sm font-medium text-gray-700">{{ message.author?.name }}</span>
              <span class="text-[11px] text-gray-500">{{ formatTimestamp(message.createdAt) }}</span>
            </div>
            <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
          </div>
        </div>

        <!-- 评论列表 -->
        <div class="ml-10 mt-2 space-y-2">
          <!-- 评论按钮移到这里，在评论列表前面 -->
          <button @click="toggleComment(message.id)"
                  class="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            评论
          </button>

          <!-- 评论输入框 -->
          <form v-if="activeMessageId === message.id"
                @submit.prevent="createComment(message.id)"
                class="mb-2">
            <div class="flex gap-2">
              <input
                v-model="commentContent"
                type="text"
                placeholder="写下你的评论..."
                class="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm bg-white/90 placeholder-gray-400
                       focus:outline-none focus:ring-1 focus:ring-gray-400/30 focus:border-gray-400"
              />
              <button type="submit"
                      class="px-4 py-2 bg-amber-900 text-amber-50 rounded-full text-sm hover:bg-amber-800
                             transition-colors shadow-sm hover:shadow">
                发送
              </button>
            </div>
          </form>

          <!-- 评论列表移到按钮和输入框后面 -->
          <div v-for="comment in message.comments"
               :key="comment.id"
               class="bg-gray-100/90 rounded-lg p-2.5 flex gap-2 border border-gray-200/50">
            <img :src="comment.author?.avatar"
                 alt="QQ Icon"
                 class="w-5 h-5 rounded-full ring-1 ring-gray-300/50" />
            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-700">{{ comment.author?.name }}</span>
                <span class="text-[11px] text-gray-500">{{ formatTimestamp(comment.createdAt) }}</span>
              </div>
              <p class="text-gray-600 text-sm mt-0.5">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
