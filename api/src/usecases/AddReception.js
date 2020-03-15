import ReceptionRepository from '@/repositories/ReceptionRepository'

export default class AddReception {
  constructor () {
    this.repository = new ReceptionRepository()
  }

  async exec(reception) {
    return await this.repository.add(reception)
  }
}
