import { ref } from 'vue'

export const useAudioPlayer = (audioPath: string) => {
  const audio = ref<HTMLAudioElement>()
  const isPlaying = ref(false)
  const isFirstVisit = ref(true)

  const initAudio = () => {
    audio.value = new Audio(audioPath)
    audio.value.loop = true
    audio.value.volume = 0.5
  }

  const togglePlay = async () => {
    if (!audio.value) return

    try {
      if (isPlaying.value) {
        await audio.value.pause()
      } else {
        await audio.value.play()
        isFirstVisit.value = false
      }
      isPlaying.value = !isPlaying.value
    } catch (error) {
      console.error('音频播放出错:', error)
    }
  }

  return {
    audio,
    isPlaying,
    isFirstVisit,
    initAudio,
    togglePlay,
  }
}
