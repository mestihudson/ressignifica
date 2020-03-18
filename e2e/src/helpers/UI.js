import { By } from 'selenium-webdriver'

export default class UI {
  constructor ({ driver }, url) {
    this.url = url
    this.driver = driver
  }

  async list () {
    await this.open()
    await this.goToListReceptions()
  }

  async goToListReceptions () {
  }

  async goToAddReception () {
    const button = await this.driver.findElement(
      By.xpath(`//*[@data-trigger='AddReception']`)
    )
    await button.click()
  }

  async goToEditReception (reception) {
    const button = await this.driver.findElement(
      By.xpath(
        `//*[@data-trigger='Edit' and @data-id='${reception.id}']`
      )
    )
    await button.click()
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

  async fillReception (reception) {
    await this.open()
    await this.goToAddReception()
    await this.fillFormReception(reception)
  }

  async open () {
    await this.driver.get(this.url)
  }

  async fillFormReception(reception) {
    const input = await this.driver.findElement(
      By.xpath(`//*[@data-name='Name']`)
    )
    await input.clear()
    await input.sendKeys(reception.name)
  }

  async saveReception () {
    const button = await this.driver.findElement(
      By.xpath(`//*[@data-trigger='Save']`)
    )
    await button.click()
  }

  async editReception (reception, changes) {
    await this.list()
    await this.goToEditReception(reception)
    await this.fillFormReception(changes)
  }

  async addReception () {
    await this.saveReception()
  }

  async changeReception () {
    await this.saveReception()
  }

  async receptionSuccessAddedMessageHaveBeenShown() {
    const notification = await this.driver
      .findElement(By.css(`[data-name='Notification']`))
    return await notification.getText()
  }

  async receptionSuccessChangedMessageHaveBeenShown() {
    return await this.receptionSuccessAddedMessageHaveBeenShown()
  }
}
