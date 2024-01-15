import { fastify } from 'fastify'
import { getAllPromptsRoute } from './routes/get-all-prompts'

const app = fastify()

app.register(getAllPromptsRoute)

app.listen({
  port: 3333,
}).then((port) => {
  console.log(`🚀 Server running on ${port}...`)
})