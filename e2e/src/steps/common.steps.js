import { Before, After } from 'cucumber'

import App from '@/App'

Before(async () => {
  App.instance()
})

After(async () => {
  App.clean()
})
