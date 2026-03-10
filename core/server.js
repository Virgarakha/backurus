import http from 'node:http'
import { Router } from './router'
import { parseRequest } from './request'
import { createRateLimiter } from './rate-limiter'
import { setContainer } from './runtime'

async function runStack(stack, req, res) {
  let index = -1
  const runner = async (position) => {
    if (position <= index) throw new Error('next() called multiple times')
    index = position
    const fn = stack[position]
    if (!fn) return
    return fn(req, res, () => runner(position + 1))
  }
  return runner(0)
}

export class Server {
  constructor({ config, container, db, events, queue, ws }) {
    this.config = config
    this.container = container
    this.db = db
    this.events = events
    this.queue = queue
    this.ws = ws
    this.router = new Router()
    this.router.use(createRateLimiter(config.rateLimit))
    setContainer(container)
  }

  async handle(req, res) {
    this.container.make('response').attach(res)
    req.container = this.container
    const parsedUrl = new URL(req.url, 'http://127.0.0.1')
    req.path = parsedUrl.pathname
    req.query = Object.fromEntries(parsedUrl.searchParams.entries())
    req.body = await parseRequest(req)

    const matched = this.router.match(req.method, req.path)
    if (!matched) return res.notFound()

    req.params = matched.params
    const stack = await this.router.resolveRouteHandlers(matched.route)

    try {
      await runStack(stack, req, res)
    } catch (error) {
      const statusCode = error.statusCode || 500
      res.error(error.message || 'Server error', statusCode, error.errors || null)
    }
  }

  async start() {
    const server = http.createServer((req, res) => this.handle(req, res))
    this.ws.attach(server)
    await new Promise((resolve) => server.listen(this.config.app.port, resolve))
    console.log(`${this.config.app.name} listening on port ${this.config.app.port}`)
  }
}
