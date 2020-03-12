import { Given, When, Then } from 'cucumber'

import App from '@/App'
import Fixtures from '@/Fixtures'

Given(/^There are receptions$/, async () => {
  await App.instance().setupReceptions(Fixtures.RECEPTIONS)
})

When(/^I list$/, async () => {
  await App.instance().listReceptions()
})

Then(/^I see that receptions have been shown$/, async () => {
  await App.instance().receptionsHaveBeenShown(Fixtures.RECEPTIONS)
})
