<script setup lang="ts">
import { formatTimestamp } from '@/shared/data-helper';
import { useMessageStore } from '@/use-message-store';
import { ref, onMounted } from 'vue'

const content = ref('')
const commentContent = ref('')
const activeMessageId = ref<string | null>(null)
const authorName = ref('')
const isDialogOpen = ref(false)
const showNameDialog = ref(false)

const { messages } = useMessageStore()
onMounted(() => {
  const savedName = localStorage.getItem('authorName')
  if (savedName) {
    authorName.value = savedName
  }
})

const handleNameSubmit = (name: string) => {
  localStorage.setItem('authorName', name)
  authorName.value = name
  showNameDialog.value = false
}

const createMessage = () => {
  // TODO: 实现创建留言的逻辑
  isDialogOpen.value = false
  content.value = ''
}

const createComment = ( ) => {
  // TODO: 实现创建评论的逻辑
  activeMessageId.value = null
  commentContent.value = ''
}
</script>

<template>
  <div class="w-full mx-auto">
    <!-- 发布按钮 -->
    <div class="flex justify-center mb-2" v-if="false">
      <button @click="isDialogOpen = true"
        class="w-96 px-4 py-2.5 rounded-full bg-gray-900 text-white text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md">
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
    <div class="space-y-2">
      <div v-for="(message, index) in messages" :key="index" class="bg-gray-50 p-4 mb-2">
        <div class="flex gap-3 items-start">
          <img :src="message.author?.avatar" alt="QQ Icon" class="w-6 h-6 rounded-full" />
          <div>
            <div class="flex items-center gap-2 text-sm">
              <span class="font-medium text-gray-900">{{ message.author?.name }}</span>
              <span class="text-xs text-gray-500">{{ formatTimestamp(message.createdAt) }}</span>
            </div>
            <p>{{ message.content }}</p>
          </div>
        </div>

        <!-- 评论列表 -->
        <div class="ml-10">
          <div v-for="comment in message.comments" :key="comment.id"
            class="bg-white/80 rounded-lg p-2.5 flex gap-2 mt-2">
            <img :src="comment.author?.avatar" alt="QQ Icon" class="w-6 h-6 rounded-full" />
            <div>
              <div class="flex items-center gap-2 text-sm">
                <span class="font-medium text-gray-900">{{ comment.author?.name }}</span>
                <span class="text-xs text-gray-500">{{ formatTimestamp(comment.createdAt) }}</span>
              </div>
              <p>{{ comment.content }}</p>
            </div>
          </div>

          <!-- 评论表单 -->
          <form v-if="activeMessageId === message.id&&false" @submit.prevent="createComment()"
            class="flex gap-2 mt-2">
            <input
              v-model="commentContent"
              type="text"
              placeholder="写下你的评论..."
              class="w-full border border-gray-200 rounded-full px-4 py-1.5 text-sm"
            />
            <button type="submit" class="px-3 py-1.5 bg-gray-900 text-white rounded-full text-sm">发送</button>
          </form>

          <button v-if="false" @click="activeMessageId = message.id"
            class="text-xs text-gray-600 ml-2 mt-2">
            回复
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
