<script setup lang="ts">
import { useAuthStore, type RegisterData } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const errorMessage = ref<string>('')

const registerData = reactive<RegisterData>({
  username: '',
  email: '',
  password: '',
  password_confirm: ''
})

const submit = async () => {
  authStore
    .register(registerData)
    .then(() => {
      router.replace({ name: 'login' })
    })
    .catch((err) => {
      errorMessage.value = err.message
    })
}
</script>

<template>
  <div id="register">
    <div class="container">
      <div class="card card-body mt-4">
        <h5 class="card-title">Register</h5>
        <form @submit.prevent="submit">
          <p v-if="errorMessage" class="error-message text-danger mb-4">{{ errorMessage }}</p>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="registerData.username" type="text" class="form-control" id="username" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input v-model="registerData.email" type="email" class="form-control" id="email" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="registerData.password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">Confirm Password</label>
            <input
              v-model="registerData.password_confirm"
              type="password"
              class="form-control"
              id="password_confirm"
            />
          </div>
          <button type="submit" class="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#register .card {
  max-width: 40vw;
  margin: auto;
}
</style>
