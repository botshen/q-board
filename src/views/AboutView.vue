<template>
  <div class="max-w-2xl mx-auto  backdrop-blur-sm relative z-10 p-6 md:p-8 rounded-lg rounded-t-none  ">
    <button @click="onBack"
            class="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-50 rounded-full
                   text-sm shadow-md flex items-center gap-2 active:scale-95 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      回到主页
    </button>
    <div class="mt-8 md:mt-12">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 relative">
        关于本站
        <div class="absolute -bottom-2 left-0 w-16 md:w-20 h-1 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full"></div>
      </h1>
      <div class="text-gray-600 leading-relaxed space-y-4 md:space-y-6 text-base md:text-lg">
        <p>时光飞逝,转眼间我们已各奔东西。还记得那些年在QQ空间里,我们互相倾诉、打趣、鼓励,留下了无数珍贵的回忆。</p>
        <p>这个留言板,是对那段纯真年代的致敬。在这里,我希望能永远保存下我们曾经的点点滴滴,那些欢声笑语,那些真挚情谊。</p>
        <p>毕业后的我们,虽然天各一方,但心与心的距离从未改变。愿这个小小的留言板,能让我们的友情继续延续,让那些美好的回忆永远鲜活。</p>
        <p>感谢有你们的陪伴,让青春如此美好。愿我们的故事,永远继续书写下去。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onBack = () => {
  router.push('/')
}
</script>
