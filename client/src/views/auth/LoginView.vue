<script setup lang="ts">
import { useAuthStore, type LoginData } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const errorMessage = ref<string>('')

const loginData = reactive<LoginData>({
  email: '',
  password: ''
})

const submit = async () => {
  await authStore
    .login(loginData)
    .then(() => {
      router.replace({ name: 'user' })
    })
    .catch((err) => {
      errorMessage.value = err.message
    })
}
</script>

<template>
  <div id="login">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Login</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="loginData.email" type="email" class="form-control" id="email" autocomplete="off" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="loginData.password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>
          <button type="submit" class="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#login .card {
  max-width: 40vw;
  margin: auto;
}
</style>
