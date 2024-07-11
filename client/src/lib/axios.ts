import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const app = axios.create({
  baseURL: API_URL
})