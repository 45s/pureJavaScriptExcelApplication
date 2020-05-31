console.log('module.js TEST')

async function start() {
  return await Promise.resolve('ASYNC WORKING')
}

start()
