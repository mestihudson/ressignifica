import AssistedRepository from '@/repositories/AssistedRepository'

export default class LoadAssisteds {
  constructor () {
    this.repository = new AssistedRepository()
  }

  async exec() {
    return await this.repository.load()
  }
}
