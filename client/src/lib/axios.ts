import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const app = axios.create({
  baseURL: API_URL
})

export const authApp = axios.create({
  baseURL: API_URL,
})

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`
  return config
}

authApp.interceptors.request.use(authInterceptor)