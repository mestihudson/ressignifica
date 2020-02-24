import { Before, Given, When, Then } from 'cucumber'
import { expect } from 'chai'

import DB from '@/helpers/DB'
import Driver from '@/helpers/Driver'
import UI from '@/helpers/UI'

let db, ui, registereds

Before(async () => {
  db = new DB()
  ui = new UI(Driver.instance(), process.env.UI_URL)
  await db.register(
    'delete from assisted',
    []
  )
  await db.register(
    'alter sequence ressignifica.assisted_id_seq restart with 1',
    []
  )
  registereds = [
    { name: 'João' },
    { name: 'Francisco' },
    { name: 'Manoel' }
  ]
})

Given(/^There are registered assisteds$/, async () => {
  for (let i = 0, l = registereds.length; i < l; i++) {
    await db.register(
      'insert into assisted (name) values ($1)',
      [registereds[i].name]
    )
  }
})

When(/^I list$/, async () => {
  await ui.list()
})

Then(/^I see all registered assisteds$/, async () => {
  expect(await ui.showneds()).to.eql(registereds)
})
