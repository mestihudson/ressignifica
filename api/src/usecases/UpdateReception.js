import ReceptionRepository from '@/repositories/ReceptionRepository'

export default class UpdateReception {
  constructor () {
    this.repository = new ReceptionRepository()
  }

  async exec(id, reception) {
    return await this.repository.update(id, reception)
  }
}
