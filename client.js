const net = require("net")

const client = net.createConnection({port:3112}, () => {
    console.log("Welcome to the chat!") 
});

client.setEncoding("utf-8")

client.on("data",data => {
    console.log(data)
});

process.stdin.on("data", (data) => {
    client.write(data)
});
