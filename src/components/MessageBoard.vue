<script setup lang="ts">
import { formatTimestamp } from '@/shared/data-helper';
import { useMessageStore } from '@/use-message-store';
import { ref, onMounted } from 'vue'
import axios from 'axios';
const content = ref('')
const commentContent = ref('')
const activeMessageId = ref<string | null>(null)
const authorName = ref('')
const isDialogOpen = ref(false)
const showNameDialog = ref(false)

const { messages } = useMessageStore()
messages.value = []
const fetchMessages = async () => {
  const res = await axios.get('http://localhost:3000/messages')
  messages.value = res.data
}
onMounted(() => {
  fetchMessages()
 })

const handleNameSubmit = (name: string) => {
  localStorage.setItem('authorName', name)
  authorName.value = name
  showNameDialog.value = false
}

const createMessage = () => {
  isDialogOpen.value = false
  content.value = ''
}

const createComment = ( ) => {
  activeMessageId.value = null
  commentContent.value = ''
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

    <!-- 名字输入对话框 -->
    <dialog v-if="showNameDialog" class="name-dialog">
      <form @submit.prevent="(e: Event) => {
        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input');
        if (input) {
          handleNameSubmit(input.value);
        }
      }">
        <div class="dialog-header">
          <h3>请输入您的名字</h3>
          <button type="button" @click="showNameDialog = false">✕</button>
        </div>
        <input
          type="text"
          placeholder="您的名字"
        />
        <button type="submit">确认</button>
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
        <div class="ml-10 mt-2">
          <div v-for="comment in message.comments"
               :key="comment.id"
               class="bg-gray-100/90 rounded-lg p-2.5 flex gap-2 mt-2 border border-gray-200/50">
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

          <!-- 评论表单 -->
          <form v-if="activeMessageId === message.id&&false"
                @submit.prevent="createComment()"
                class="flex gap-2 mt-2">
            <input
              v-model="commentContent"
              type="text"
              placeholder="写下你的评论..."
              class="w-full border border-gray-200 rounded-full px-3 py-1.5 text-sm bg-white/90 placeholder-gray-400
                     focus:outline-none focus:ring-1 focus:ring-gray-400/30 focus:border-gray-400"
            />
            <button type="submit"
                    class="px-3 py-1.5 bg-gray-700 text-gray-50 rounded-full text-sm hover:bg-gray-600
                           transition-colors shadow-sm hover:shadow">
              发送
            </button>
          </form>

          <button v-if="false"
                  @click="activeMessageId = message.id"
                  class="text-xs text-gray-500 hover:text-gray-700 ml-2 mt-1.5">
            回复
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
