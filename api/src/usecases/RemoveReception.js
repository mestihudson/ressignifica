import ReceptionRepository from '@/repositories/ReceptionRepository'

export default class RemoveReception {
  constructor () {
    this.repository = new ReceptionRepository()
  }

  async exec(id) {
    return await this.repository.removeBy(id)
  }
}
