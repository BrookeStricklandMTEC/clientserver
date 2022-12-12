const client = net.createConnection({port: 5000}, () => {
    console.log('connected');
});

client.on('exit', () => {
    console.log('client disconnected');
});

client.setEncoding('utf8'); 

client.on('data', data => {
    console.log(data)
})