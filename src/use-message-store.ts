import { ref } from 'vue'

const me = ref({
  name: '李华',
  avatar: '/me.jpeg',
})
const you = ref({
  name: '漫漫🐟',
  avatar: '/you.jpeg',
})

const messages = ref([
  {
    id: '1',
    author: me.value,
    content: '今天天气真不错，适合出去玩！',
    createdAt: 1710900600000, // 2024-03-20 10:30:00
    comments: [
      {
        id: '1-1',
        author: you.value,
        content: '确实是个好天气呢！',
        createdAt: 1710900900000, // 2024-03-20 10:35:00
      },
      {
        id: '1-2',
        author: you.value,
        content: '周末一起去爬山吧！',
        createdAt: 1710901200000, // 2024-03-20 10:40:00
      },
    ],
  },
])

export const useMessageStore = () => {
  return {
    messages,
  }
}
