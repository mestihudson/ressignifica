import { setDefaultTimeout, BeforeAll, After, AfterAll } from 'cucumber'

import Driver from '@/helpers/Driver'

setDefaultTimeout(60 * 1000)

BeforeAll(async () => {
  Driver.instance({
    browser: process.env.BROWSER,
    hub: process.env.HUB_URL,
    screenshots: process.env.SCREENSHOTS
  })
})

After(async (context) => {
  await Driver.instance().screenshot(context)
  await Driver.instance().source(context)
})

AfterAll(async () => {
  await Driver.instance().clean()
})
