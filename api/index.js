import express from 'express'

import LoadReceptions from '@/usecases/LoadReceptions'
import RemoveReception from '@/usecases/RemoveReception'

const app = express()

app.get('/assisteds', async (request, response) => {
  const useCase = new LoadReceptions()
  response.json(await useCase.exec())
})

app.delete('/reception/:id', async (request, response) => {
  const useCase = new RemoveReception()
  await useCase.exec(request.params.id)
  response.status(201).end()
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server api is running at ${port}`)
})
