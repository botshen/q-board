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
  <div class="message-board">
    <!-- 发布按钮 -->
    <div class="publish-btn" v-if="false">
      <button @click="isDialogOpen = true">
        发布新留言
      </button>
    </div>

    <!-- 留言对话框 -->
    <dialog v-if="isDialogOpen" class="message-dialog">
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
    <div class="message-list">
      <div v-for="(message, index) in messages" :key="index" class="message-item">
        <div class="message-header">
          <img src="/logo.jpeg" alt="QQ Icon" class="avatar" />
          <div class="message-info">
            <div class="message-meta">
              <span class="author">{{ message.author?.name }}</span>
              <span class="date">{{ message.createdAt }}</span>
            </div>
            <p class="message-content">{{ message.content }}</p>
          </div>
        </div>

        <!-- 评论列表 -->
        <div class="comments">
          <div v-for="comment in message.comments" :key="comment.id" class="comment">
            <img src="/logo.jpeg" alt="QQ Icon" class="avatar" />
            <div class="comment-info">
              <div class="comment-meta">
                <span class="author">{{ comment.author?.name }}</span>
                <span class="date">{{ comment.createdAt }}</span>
              </div>
              <p class="comment-content">{{ comment.content }}</p>
            </div>
          </div>

          <!-- 评论表单 -->
          <form v-if="activeMessageId === message.id&&false" @submit.prevent="createComment( )" class="comment-form">
            <input
              v-model="commentContent"
              type="text"
              placeholder="写下你的评论..."
            />
            <button type="submit">发送</button>
          </form>
          <button v-if="false" @click="activeMessageId = message.id" class="reply-btn">
            回复
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-board {
  width: 100%;
  margin: 0 auto;
}

.publish-btn {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
 }

.publish-btn button {
  width: 380px;
  padding: 0.625rem 1rem;
  border-radius: 9999px;
  background-color: #111827;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.publish-btn button:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.message-dialog,
.name-dialog {
  position: fixed;
  inset: 0;
  width: 400px;
  max-width: 32rem;
  margin: auto;
  border-radius: 1rem;
  padding: 0;
  background: transparent;
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.message-item {
  background-color: #f9fafb;
  padding: 1rem;
  margin-bottom: 0.5rem;
}

.message-header {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.avatar {
  width: 24px;
  height: 20px;
}

.message-meta,
.comment-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.author {
  font-weight: 500;
  color: #111827;
}

.date {
  font-size: 0.75rem;
  color: #6b7280;
}

.comments {
  margin-left: 2.5rem;
}

.comment {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5rem;
  padding: 0.625rem;
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.comment-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.reply-btn {
  font-size: 0.75rem;
  color: #4b5563;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
}

input,
textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
}

textarea {
  min-height: 80px;
  border-radius: 0.75rem;
}

button {
  cursor: pointer;
}
</style>
