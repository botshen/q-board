import { ref } from 'vue'

const DEFAULT_NAME = '漫漫🐟'
const DEFAULT_AVATAR = '/you.jpeg'

const me = ref({
  name: localStorage.getItem('authorName') || DEFAULT_NAME,
  avatar: localStorage.getItem('authorAvatar') || DEFAULT_AVATAR,
})
const youAvatar = ref('/you.jpeg')
const meAvatar = ref('/me.jpeg')

// 初始化 localStorage
if (!localStorage.getItem('authorName')) {
  localStorage.setItem('authorName', DEFAULT_NAME)
  localStorage.setItem('authorAvatar', DEFAULT_AVATAR)
}

const toggleMe = () => {
  const isYou = me.value.name === DEFAULT_NAME
  me.value.name = isYou ? '李华' : DEFAULT_NAME
  me.value.avatar = isYou ? meAvatar.value : youAvatar.value
  localStorage.setItem('authorName', me.value.name)
  localStorage.setItem('authorAvatar', me.value.avatar)
}
export const useMeStore = () => {
  return {
    me,
    youAvatar,
    meAvatar,
    toggleMe,
  }
}
