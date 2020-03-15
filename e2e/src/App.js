import chai, { expect } from 'chai'
import chaiSubset from 'chai-subset'

chai.use(chaiSubset)

import DB from '@/helpers/DB'
import Driver from '@/helpers/Driver'
import UI from '@/helpers/UI'

class App {
  constructor () {
    this.db = new DB()
    this.ui = new UI(Driver.instance(), process.env.UI_URL)
  }

  async setupReceptions (receptions) {
    await this.db.clean('reception', 'reception_id_seq')
    await this.existentReceptions(0)
    await this.db.insert('reception', receptions, 'id')
    await this.existentReceptions(receptions.length)
  }

  async listReceptions () {
    await this.ui.list()
  }

  async receptionsHaveBeenShown (receptions) {
    expect(receptions).to.containSubset(await this.ui.showneds())
    await this.existentReceptions(receptions.length)
  }

  async listAllReceptions (receptions) {
    await this.setupReceptions(receptions)
    await this.listReceptions()
    await this.receptionsHaveBeenShown(receptions)
  }

  async removeReception (reception) {
    await this.ui.removeReception(reception)
  }

  async fillReception (receptions, reception) {
    await this.setupReceptions(receptions)
    await this.ui.fillReception(reception)
  }

  async addReception () {
    await this.ui.addReception()
  }

  async receptionHaveBeenAdded (receptions) {
    expect(await this.ui.receptionSuccessAddedMessageHaveBeenShown())
      .to.equal(`Reception successful created.`)
    await this.existentReceptions(receptions.length)
  }

  async existentReceptions (quantity) {
    expect(await this.db.count('reception')).to.equal(quantity)
  }
}

App._instance = null

App.instance = () => {
  if (App._instance === null) {
    App._instance = new App()
  }
  return App._instance
}

App.clean = () => {
  App._instance = null
}

export default App
