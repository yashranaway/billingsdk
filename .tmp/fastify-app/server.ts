import Fastify from 'fastify'
import rawBody from 'fastify-raw-body'
import dodopaymentsRoutes from './src/routes/dodopayments/route'

async function main() {
  const fastify = Fastify({ logger: true })
  await fastify.register(rawBody, { field: 'rawBody', global: false, encoding: 'utf8', runFirst: true })
  await fastify.register(dodopaymentsRoutes, { prefix: '/api/dodopayments' })

  const port = Number(process.env.PORT) || 3000
  await fastify.listen({ port })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
