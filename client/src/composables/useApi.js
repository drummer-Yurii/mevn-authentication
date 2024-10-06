import { axiosInstance } from '../utils/axios'
import { useAuthStore } from '../stores/auth'

export default function useApi() {
  const authStore = useAuthStore()
  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${authStore.accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error)
    }
  )
  return axiosInstance
}
