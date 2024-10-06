<script async setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.user
})

const getUser = async () => {
  await authStore.getUser()
}
await getUser()
</script>

<template>
  <div id="user">
    <div class="container">
      <div v-if="user" class="card card-body mt-4">
        <h5 class="card-title">Username: {{ user.username }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Email: {{ user.email }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">First Name: {{ user.first_name }}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Last Name: {{ user.last_name }}</h6>
      </div>
    </div>
  </div>
</template>

<style scoped>
#user .card {
  max-width: 40vw;
  margin: auto;
}
</style>
