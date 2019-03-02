const ws = require('ws');

const server = new ws.Server({port: 3000})

console.log(server)
// setInterval(() => console.log(ws),1000)


server.on('connection', wsocket => {
  wsocket.on('message', message => {
    console.log(message)
    if (message === 'exit') {
      wsocket.close()
    } else {
      server.clients.forEach(client => {
        if(client.readyState === ws.OPEN) {
          client.send(message)
        }
      })
    }

  })
  wsocket.send('hello WS')
})