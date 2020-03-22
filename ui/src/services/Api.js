import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL
  : ''

export default {
  async loadReceptions () {
    return axios.get(`${API_URL}/api/assisteds`)
      .then(({ data }) => Promise.resolve(data))
      .catch((errors) => Promise.reject(errors))
  },
  async removeReception (id) {
    return axios.delete(`${API_URL}/api/reception/${id}`)
      .then(({ data }) => Promise.resolve(data))
      .catch((errors) => Promise.reject(errors))
  },
  async addReception (reception) {
    return axios.post(`${API_URL}/api/reception`, reception)
      .then(({ data }) => Promise.resolve(data))
      .catch((errors) => Promise.reject(errors))
  },
  async getReception (id) {
    return axios.get(`${API_URL}/api/reception/${id}`)
      .then(({ data }) => Promise.resolve(data))
      .catch((errors) => Promise.reject(errors))
  },
  async updateReception (id, reception) {
    return axios.put(`${API_URL}/api/reception/${id}`, reception)
      .then(() => Promise.resolve())
      .catch((errors) => Promise.reject(errors))
  }
}
