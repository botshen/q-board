<script setup lang="ts">
import MessageBoard from '@/components/MessageBoard.vue'
</script>

<template>
  <main>
    <div class="max-w-md mx-auto bg-white/90 backdrop-blur-sm">
      <div class="flex items-center gap-3 my-2">
        <img
          src="/logo.webp"
          alt="QQ Icon"
          class="w-8"
        />
        <div class="text-2xl font-bold text-gray-900">
          QQ 留言板 ⭐️
        </div>
      </div>
      <div class="border-t border-gray-200 pt-2">
        <MessageBoard />
      </div>
    </div>
  </main>
</template>

