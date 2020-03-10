import { expect } from 'chai'

import DB from '@/helpers/DB'
import Driver from '@/helpers/Driver'
import UI from '@/helpers/UI'

export default class App {
  constructor () {
    this.db = new DB()
    this.ui = new UI(Driver.instance(), process.env.UI_URL)
  }

  async setupReceptions (receptions) {
    await this.db.register(
      'delete from reception',
      []
    )
    await this.db.register(
      'alter sequence ressignifica.reception_id_seq restart with 1',
      []
    )
    for (let i = 0, l = receptions.length; i < l; i++) {
      await this.db.register(
        'insert into reception (name) values ($1)',
        [receptions[i].name]
      )
    }
  }

  async listReceptions () {
    await this.ui.list()
  }

  async receptionsHaveBeenShown (receptions) {
    expect(await this.ui.showneds()).to.eql(receptions)
  }
}
