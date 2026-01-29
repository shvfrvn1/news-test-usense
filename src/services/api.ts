import axios from 'axios'
import { getApiKey } from '../config/env'

const BASE_URL = 'https://content.guardianapis.com'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  config.params = { ...config.params, 'api-key': getApiKey() }
  return config
})

export interface RequestConfig {
  signal?: AbortSignal
}
