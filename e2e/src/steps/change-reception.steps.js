import { Given, When, Then } from 'cucumber'

import App from '@/App'
import Fixtures from '@/Fixtures'
import Driver from '@/helpers/Driver'

Given(/^I select a reception to change$/, async () => {
  await App.instance().selectReceptionToChange(
    Fixtures.RECEPTIONS,
    Fixtures.RECEPTION_TO_CHANGE,
    Fixtures.RECEPTION_CHANGES
  )
})

When(/^I change$/, async () => {
  await App.instance().changeReception()
})

Then(/^I see that reception have been changed$/, async () => {
  await App.instance().receptionHaveBeenChanged(
    Fixtures.RECEPTIONS,
    Fixtures.RECEPTION_AFTER_CHANGE
  )
})
