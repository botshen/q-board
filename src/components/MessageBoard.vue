<script setup lang="ts">
import { ref, onMounted } from 'vue'

const content = ref('')
const commentContent = ref('')
const activeMessageId = ref<string | null>(null)
const authorName = ref('')
const isDialogOpen = ref(false)
const showNameDialog = ref(false)
const messages = ref([
  {
    id: '1',
    author: {
      name: '张三',
    },
    content: '今天天气真不错，适合出去玩！',
    createdAt: '2024-03-20 10:30',
    comments: [
      {
        id: '1-1',
        author: {
          name: '李四',
        },
        content: '确实是个好天气呢！',
        createdAt: '2024-03-20 10:35'
      },
      {
        id: '1-2',
        author: {
          name: '王五',
        },
        content: '周末一起去爬山吧！',
        createdAt: '2024-03-20 10:40'
      }
    ]
  },
  {
    id: '2',
    author: {
      name: '小明',
    },
    content: '刚学完Vue 3，感觉很有意思！',
    createdAt: '2024-03-20 09:15',
    comments: [
      {
        id: '2-1',
        author: {
          name: '小红',
        },
        content: '要不要一起学习交流呀？',
        createdAt: '2024-03-20 09:20'
      }
    ]
  },
  {
    id: '3',
    author: {
      name: '老王',
    },
    content: '推荐一个好看的电影：《闪电侠》',
    createdAt: '2024-03-19 20:30',
    comments: []
  },
  {
    id: '4',
    author: {
      name: '小李',
    },
    content: '有没有人知道附近有什么好吃的餐厅？',
    createdAt: '2024-03-19 18:45',
    comments: [
      {
        id: '4-1',
        author: {
          name: '小张',
        },
        content: '西街的川菜馆不错！',
        createdAt: '2024-03-19 18:50'
      }
    ]
  },
  {
    id: '5',
    author: {
      name: '大山',
    },
    content: '周末有人一起打篮球吗？',
    createdAt: '2024-03-19 16:20',
    comments: [
      {
        id: '5-1',
        author: {
          name: '小河',
        },
        content: '我可以！在哪里打？',
        createdAt: '2024-03-19 16:25'
      },
      {
        id: '5-2',
        author: {
          name: '小海',
        },
        content: '算我一个！',
        createdAt: '2024-03-19 16:30'
      }
    ]
  }
])

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
          <img src="/logo.jpeg" alt="QQ Icon" class="w-6 h-5" />
          <div>
            <div class="flex items-center gap-2 text-sm">
              <span class="font-medium text-gray-900">{{ message.author?.name }}</span>
              <span class="text-xs text-gray-500">{{ message.createdAt }}</span>
            </div>
            <p>{{ message.content }}</p>
          </div>
        </div>

        <!-- 评论列表 -->
        <div class="ml-10">
          <div v-for="comment in message.comments" :key="comment.id"
            class="bg-white/80 rounded-lg p-2.5 flex gap-2 mt-2">
            <img src="/logo.jpeg" alt="QQ Icon" class="w-6 h-5" />
            <div>
              <div class="flex items-center gap-2 text-sm">
                <span class="font-medium text-gray-900">{{ comment.author?.name }}</span>
                <span class="text-xs text-gray-500">{{ comment.createdAt }}</span>
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
