import { createCachedFn } from '@/shared/data-helper'
import { ref } from 'vue'
import type { Message } from './message-types'
import { httpClient } from '@/shared/http-client'
const meAvatar = ref('/me.jpeg')

const youAvatar = ref('/you.jpeg')
export const messageApi = {
  list: () => {
    return httpClient.get<Message[]>('/messages')
  },
}

export const useMessageStore = createCachedFn(() => {
  const messages = ref<Message[]>([])

  const gettingMessage = ref(false)
  const getMessage = async () => {
    gettingMessage.value = true
    const r = await messageApi.list()
    gettingMessage.value = false
    console.log('r', r)
    r.forEach((message) => {
      message.author.avatar = message.author.name === '李华' ? meAvatar.value : youAvatar.value
      message.comments?.forEach((comment) => {
        comment.author.avatar = comment.author.name === '李华' ? meAvatar.value : youAvatar.value
      })
    })
    messages.value = r
  }
  return {
    getMessage,
    gettingMessage,
    messages,
  }
})
