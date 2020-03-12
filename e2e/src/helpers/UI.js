import { By } from 'selenium-webdriver'

export default class UI {
  constructor ({ driver }, url) {
    this.url = url
    this.driver = driver
  }

  async list () {
    await this.driver.get(this.url)
  }

  async showneds () {
    const items = await this.driver
      .findElements(By.xpath(`//*[@data-name='Line']//*[@data-name='Content']`))
    const elements = []
    for (let i = 0, l = items.length; i < l; i++) {
      const name =  await items[i].getText()
      elements.push({ name })
    }
    return elements
  }

  async removeReception (reception) {
    const button = await this.driver.findElement(
      By.xpath(`//*[@data-trigger='Remove' and @data-id='${reception.id}']`)
    )
    await button.click()
  }
}
