import { axiosInstance, axiosPrivareInstance } from '../utils/axios'
import { useAuthStore } from '../stores/auth'
import { watchEffect } from 'vue'

export function useApiPrivate() {
  const authStore = useAuthStore()
  watchEffect(() => {
    axiosPrivareInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    axiosPrivareInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (
          (error?.response?.status === 403 || error?.response?.status === 401) &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true
          await authStore.refresh()
          prevRequest.headers['Authorization'] = authStore.accessToken
          return axiosPrivareInstance(prevRequest)
        }
        return Promise.reject(error)
      }
    )
  })
  return axiosPrivareInstance
}

export function useApi() {
  return axiosInstance
}
