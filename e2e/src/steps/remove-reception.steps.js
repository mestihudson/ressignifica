import { Before, Given, When, Then } from 'cucumber'

import App from '@/App'
import Fixtures from '@/Fixtures'

Given(/^I list all receptions$/, async () => {
  await App.instance().listAllReceptions(Fixtures.RECEPTIONS)
})

When(/^I remove$/, async () => {
  await App.instance().removeReception(Fixtures.RECEPTION_TO_REMOVE)
})

Then(/^I see that receptions have been decreased$/, async () => {
  await App.instance().receptionsHaveBeenShown(Fixtures.RECEPTIONS_AFTER_REMOVE)
})
