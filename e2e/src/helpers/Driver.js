import S from 'string'
import fs from 'fs'

import { Builder } from 'selenium-webdriver'

class Driver {
  constructor ({ browser, hub, screenshots }) {
    this.driver = new Builder()
      .forBrowser(this.browser = browser)
      .usingServer(hub)
      .build()
    this.screenshots = screenshots
  }

  scenario (context) {
    return S(context.pickle.name).slugify().s
  }

  async filename (context) {
    const status = context.result.status
    const feature = this.feature(context)
    const scenario = this.scenario(context)
    const directory = `${this.screenshots}/${this.browser}/${status}/${feature}`
    if (!fs.existsSync(directory)){
      fs.mkdirSync(directory, { recursive: true })
    }
    return `${directory}/${scenario}`
  }

  feature (context) {
    return context.sourceLocation.uri.replace(/^(.+)\/features\//, '')
      .replace(/\.feature$/, '')
  }

  async screenshot (context) {
    const name = await this.filename(context)
    this.driver.takeScreenshot().then((image, errors) => {
      fs.writeFile(
         `${name}.png`,
        image,
        'base64',
        (error) => {
          if (error) {
            console.error(error)
          }
        }
      )
    })
  }

  async source (context) {
    const name = await this.filename(context)
    this.driver.getPageSource().then((source) => {
      fs.writeFile(
        `${name}.html`,
        source, (error) => {
        if (error) {
          return console.error(error)
        }
      })
    })
  }

  async clean () {
    await this.driver.manage().deleteAllCookies()
    await this.driver.quit()
  }
}

Driver._instance = null

Driver.instance = (config) => {
  if (Driver._instance === null) {
    Driver._instance = new Driver(config)
  }
  return Driver._instance
}

export default Driver
