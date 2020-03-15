import express from 'express'
import bodyParser from 'body-parser'

import LoadReceptions from '@/usecases/LoadReceptions'
import RemoveReception from '@/usecases/RemoveReception'
import AddReception from '@/usecases/AddReception'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/assisteds', async (request, response) => {
  const useCase = new LoadReceptions()
  response.json(await useCase.exec())
})

app.delete('/reception/:id', async (request, response) => {
  const useCase = new RemoveReception()
  await useCase.exec(request.params.id)
  response.status(201).end()
})

app.post('/reception', async (request, response) => {
  const useCase = new AddReception()
  const result = await useCase.exec(request.body)
  await response.json(result).end()
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server api is running at ${port}`)
})
