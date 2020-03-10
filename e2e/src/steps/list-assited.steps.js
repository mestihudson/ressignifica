import { Before, Given, When, Then } from 'cucumber'

import App from '@/App'

let app, assisted

Before(async () => {
  app = new App()
  assisted = [
    { name: 'João' },
    { name: 'Francisco' },
    { name: 'Manoel' }
  ]
})

Given(/^There are assisted$/, async () => {
  await app.setupAssisted(assisted)
})

When(/^I list$/, async () => {
  await app.listAssisted()
})

Then(/^I see that assisted have been shown$/, async () => {
  await app.assistedHaveBeenShown(assisted)
})
