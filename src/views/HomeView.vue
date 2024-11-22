<script setup lang="ts">
import MessageBoard from '@/components/MessageBoard.vue'
 </script>

<template>
  <main>
    <div class="container">
      <div class="header">
        <img
          src="/logo.jpeg"
          alt="QQ Icon"
          class="logo"
        />
        <h1 class="title">
          QQ 留言板 ⭐️
        </h1>
      </div>
      <div class="divider">
        <MessageBoard />
      </div>
    </div>
  </main>
</template>
<style scoped>
.container {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  max-width: 28rem;  /* equivalent to max-w-md */
  margin-left: auto;
  margin-right: auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.logo {
  width: 32px;
 
}

.title {
  color: #111827;  /* text-gray-900 */
  font-size: 1.5rem;  /* text-2xl */
  font-weight: 700;  /* font-bold */
}

.divider {
  border-top: 2px solid #E5E7EB;  /* border-gray-200 */
  padding-top: 1rem;
}
</style>

