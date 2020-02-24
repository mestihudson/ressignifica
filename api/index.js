import express from 'express'

import Assisteds from '@/usecases/LoadAssisteds'

const app = express()

app.get('/assisteds', async (request, response) => {
  const useCase = new Assisteds()
  response.json(await useCase.exec())
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server api is running at ${port}`)
})
