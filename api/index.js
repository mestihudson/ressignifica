import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import LoadReceptions from '@/usecases/LoadReceptions'
import RemoveReception from '@/usecases/RemoveReception'
import AddReception from '@/usecases/AddReception'
import GetReception from '@/usecases/GetReception'
import UpdateReception from '@/usecases/UpdateReception'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? process.env.CORS_ORIGIN
      : '*'
  })
)
const router = express.Router()

router.get('/assisteds', async (request, response) => {
  const useCase = new LoadReceptions()
  response.json(await useCase.exec()).end()
})

router.delete('/reception/:id', async (request, response) => {
  const useCase = new RemoveReception()
  await useCase.exec(request.params.id)
  response.status(201).end()
})

router.get('/reception/:id', async (request, response) => {
  const useCase = new GetReception()
  response.json(await useCase.exec(request.params.id)).end()
})

router.put('/reception/:id', async (request, response) => {
  const useCase = new UpdateReception()
  await useCase.exec(request.params.id, request.body)
  response.status(201).end()
})

router.post('/reception', async (request, response) => {
  const useCase = new AddReception()
  const result = await useCase.exec(request.body)
  await response.json(result).end()
})

app.use('/api', router)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server api is running at ${port}`)
})
