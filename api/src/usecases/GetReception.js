import ReceptionRepository from '@/repositories/ReceptionRepository'

export default class GetReceptions {
  constructor () {
    this.repository = new ReceptionRepository()
  }

  async exec(id) {
    return await this.repository.get(id)
  }
}
