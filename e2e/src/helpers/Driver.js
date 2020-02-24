import S from 'string'
import fs from 'fs'

import { Builder } from 'selenium-webdriver'

const filename = (context, screenshots, browser) => {
  const status = context.result.status
  const feature = context
    .sourceLocation.uri.replace(/^(.+)\/features\//, '').replace(/\.feature$/, '')
  const scenario = S(context.pickle.name).slugify().s
  const directory = `${screenshots}/${browser}/${status}/${feature}`
  if (!fs.existsSync(directory)){
    fs.mkdirSync(directory, { recursive: true })
  }
  return `${directory}/${scenario}`
}

class Driver {
  constructor ({ browser, hub, screenshots }) {
    this.driver = new Builder()
      .forBrowser(this.browser = browser)
      .usingServer(hub)
      .build()
    this.screenshots = screenshots
  }

  async screenshot (context) {
    this.driver.takeScreenshot().then((image, errors) => {
      fs.writeFile(
        `${filename(context, this.screenshots, this.browser)}.png`,
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
    this.driver.getPageSource().then((source) => {
      fs.writeFile(
        `${filename(context, this.screenshots, this.browser)}.html`,
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
