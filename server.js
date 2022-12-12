const net = require('net')

const server = net.createServer((client) => {
    client.write('welcome to the chat!')
}).listen(5000);

console.log('listening on port 5000');