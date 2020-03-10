import ReceptionRepository from '@/repositories/ReceptionRepository'

export default class LoadReceptions {
  constructor () {
    this.repository = new ReceptionRepository()
  }

  async exec() {
    return await this.repository.load()
  }
}
