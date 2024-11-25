import { ref } from 'vue'

const me = ref<'漫漫🐟' | '李华'>('漫漫🐟')
export const useMeStore = () => {
  return {
    me,
  }
}
