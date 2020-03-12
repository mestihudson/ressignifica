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
    await this.db.register(
      'delete from reception', []
    )
    await this.db.register(
      'alter sequence ressignifica.reception_id_seq restart with 1', []
    )
    for (let i = 0, l = receptions.length; i < l; i++) {
      const { id, name } = receptions[i]
      await this.db.register(
        'insert into reception (id, name) values ($1, $2)', [id, name]
      )
    }
  }

  async listReceptions () {
    await this.ui.list()
  }

  async receptionsHaveBeenShown (receptions) {
    expect(receptions).to.containSubset(await this.ui.showneds())
  }

  async listAllReceptions (receptions) {
    await this.setupReceptions(receptions)
    await this.listReceptions()
    await this.receptionsHaveBeenShown(receptions)
  }

  async removeReception (reception) {
    await this.ui.removeReception(reception)
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
