import { BeforeAll, After, AfterAll } from 'cucumber'

import Driver from '@/helpers/Driver'

BeforeAll(async () => {
  Driver.instance({
    browser: process.env.BROWSER,
    hub: `http://${process.env.HUB_HOST}:${process.env.HUB_PORT}/wd/hub`,
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
