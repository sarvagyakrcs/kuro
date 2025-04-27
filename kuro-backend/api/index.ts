import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'nodejs'
}

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

export default handle(app)
