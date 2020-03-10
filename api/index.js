import express from 'express'

import LoadReceptions from '@/usecases/LoadReceptions'

const app = express()

app.get('/assisteds', async (request, response) => {
  const useCase = new LoadReceptions()
  response.json(await useCase.exec())
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server api is running at ${port}`)
})
