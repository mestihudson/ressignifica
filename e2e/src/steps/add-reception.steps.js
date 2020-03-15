import { Given, When, Then } from 'cucumber'

import App from '@/App'
import Fixtures from '@/Fixtures'

Given(/^I fill a reception$/, async () => {
  await App.instance().fillReception(
    Fixtures.RECEPTIONS,
    Fixtures.RECEPTION_TO_ADD
  )
})

When(/^I add$/, async () => {
  await App.instance().addReception()
})

Then(/^I see that reception have been added$/, async () => {
  await App.instance().receptionHaveBeenAdded(Fixtures.RECEPTIONS_AFTER_ADD)
})
