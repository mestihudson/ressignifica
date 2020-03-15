import axios from 'axios'

export default {
  async loadReceptions () {
    return axios.get(`/api/assisteds`)
      .then(({ data }) => Promise.resolve(data))
      .catch((errors) => Promise.reject(errors))
  },
  async removeReception (id) {
    return axios.delete(`/api/reception/${id}`)
      .then(({ data }) => Promise.resolve(data))
      .catch((errors) => Promise.reject(errors))
  },
  async addReception (reception) {
    return axios.post(`/api/reception`, reception)
      .then(({ data }) => Promise.resolve(data))
      .catch((errors) => Promise.reject(errors))
  }
}
