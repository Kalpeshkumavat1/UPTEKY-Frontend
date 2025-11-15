import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/feedback', feedbackData)
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to submit feedback' }
  }
}

export const getAllFeedback = async () => {
  try {
    const response = await api.get('/feedback')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch feedback' }
  }
}

export const getStats = async () => {
  try {
    const response = await api.get('/stats')
    return response.data
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch stats' }
  }
}

