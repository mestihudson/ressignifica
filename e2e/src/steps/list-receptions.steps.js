import { Before, Given, When, Then } from 'cucumber'

import App from '@/App'

let app, receptions

Before(async () => {
  app = new App()
  receptions = [
    { name: 'João' },
    { name: 'Francisco' },
    { name: 'Manoel' }
  ]
})

Given(/^There are receptions$/, async () => {
  await app.setupReceptions(receptions)
})

When(/^I list$/, async () => {
  await app.listReceptions()
})

Then(/^I see that receptions have been shown$/, async () => {
  await app.receptionsHaveBeenShown(receptions)
})
