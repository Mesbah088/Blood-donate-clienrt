import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  verify: (data) => apiClient.post('/auth/verify', data),
  profile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
}

export const donationsAPI = {
  getAll: (params) => apiClient.get('/donations', { params }),
  getById: (id) => apiClient.get(`/donations/${id}`),
  create: (data) => apiClient.post('/donations', data),
  update: (id, data) => apiClient.put(`/donations/${id}`, data),
  delete: (id) => apiClient.delete(`/donations/${id}`),
  getMyDonations: () => apiClient.get('/donations/my'),
}

export const requestsAPI = {
  getAll: (params) => apiClient.get('/requests', { params }),
  getById: (id) => apiClient.get(`/requests/${id}`),
  create: (data) => apiClient.post('/requests', data),
  update: (id, data) => apiClient.put(`/requests/${id}`, data),
  delete: (id) => apiClient.delete(`/requests/${id}`),
  getMyRequests: () => apiClient.get('/requests/my'),
  respond: (id, data) => apiClient.post(`/requests/${id}/respond`, data),
}

export const usersAPI = {
  getAll: (params) => apiClient.get('/users', { params }),
  getById: (id) => apiClient.get(`/users/${id}`),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
  search: (params) => apiClient.get('/users/search', { params }),
}

export const blogAPI = {
  getAll: (params) => apiClient.get('/blog', { params }),
  getById: (id) => apiClient.get(`/blog/${id}`),
  create: (data) => apiClient.post('/blog', data),
  update: (id, data) => apiClient.put(`/blog/${id}`, data),
  delete: (id) => apiClient.delete(`/blog/${id}`),
}

export const statsAPI = {
  getDashboard: () => apiClient.get('/stats/dashboard'),
  getDonorStats: () => apiClient.get('/stats/donor'),
  getAdminStats: () => apiClient.get('/stats/admin'),
}