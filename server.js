const knex = require('knex');
const config = require('./knexfile');
// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const db = knex(config.development)

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.get('/todos', async (request, reply) => {
  const todos = await db('todos')

  reply.send(todos)
});

fastify.get('/todos/:id', async (request, reply) => {
  const id = request.params.id;

  const todo = await db('todos').where({ id }).first();

  reply.send(todo);
});

fastify.post('/todos', async (request, reply) => {
  const todo = {
    activity: request.body.activity,
    status: 'TODO'
  }
  await db('todos').insert(todo);
});

fastify.put('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const { status } = request.body;
  await db('todos').update({ status }).where({ id });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
