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
  }
}
