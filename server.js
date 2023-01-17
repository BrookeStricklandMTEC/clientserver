const { write } = require("fs");
const net = require("net")
const fs = require("fs");
const { runInContext } = require("vm");

const password = "kitten26"

let clientCounter = 1
let clients =[]

let stream = fs.createWriteStream("server.log")

const server = net.createServer((client) => {
   if(client){
        client.userName ="Guest"+clientCounter
        client.write("Welcome "+client.userName +"\n")
        stream.write("Welcome "+client.userName +"\n")
        clients.push(client)
        console.log(client.userName + " joined the chat\n")
        clientCounter++
    for(let i = 0; i<clients.length; i++){
        if(client.userName === clients[i].userName){            
        }
        else{
            clients[i].write(client.userName+ " joined\n" )    
        }
    }   
   }

   client.setEncoding("utf-8")
   client.on("data",data => {
        if(data.includes("/w")){
        }
        else if(data.includes("/kick")){
            const words = data.split(' ');
            if(words[2].trim() === password){
                for(let m = 0; m< clients.length; m++){
                    let c = clients[m].userName
                    if(words[1].trim() === clients[m].userName){
                        for(let q = 0; q<clients.length; q++){
                            if(words[1].trim() === clients[q].userName){
                                clients[q].write("You have been kicked by the administrator")
                            }
                        }
                        clients[m].destroy()
                        clients.filter(client => (client.userName !== c))
                        return
                    }
                }
            }
            else{
                client.write("Incorrect password")
                return; 
            }
        }
        else if(data.includes("/clientlist")){
            client.write("Active Users:")
            for(let n = 0; n<clients.length ; n++){
                client.write(clients[n].userName+"\n")
            }
            return
        }
        else if(data.includes("/username")){
            const oldname = client.userName
            const words = data.split(' ');
            for(let x = 0; x<clients.length; x++){
                if(client.userName === clients[x].userName ){
                    clients[x].userName = words[1].trim()
                    console.log(oldname + " changed their name to "+ clients[x].userName)
                    stream.write(oldname + " changed their name to "+ clients[x].userName+"\n")
                    for(let i = 0; i<clients.length; i++){
                        if(client.userName === clients[i].userName){

                        }
                        else{
                            clients[i].write(oldname + " changed their name to "+ clients[x].userName)
                        }
                    }
                    return
                }
            
            }
        }
        else{
            console.log(client.userName+": "+data)
        }
        for(let i = 0; i<clients.length; i++){

            if(data.includes("/w "+clients[i].userName)){
                let num = i                
                const words = data.split(' ');
                let message = ""

                for(let y = 2 ; y<words.length; y++){
                    message = message + words[y] + " "
                }

                console.log(client.userName+" whispering to "+clients[i].userName+": " + message )
                stream.write(client.userName+" whispered: " + message )
                clients[num].write(client.userName+" whispered: " + message)
                
            }
            else if(data.includes("/w ")){
            }
            else {
                if(client.userName === clients[i].userName){
                }
                else{
                    clients[i].write(client.userName+": "+data)
                    stream.write(client.userName+": "+data)
                }
            }
            
        }           
    })

    client.on("exit", data => {
        console.log(client.userName+" disconnected from chat")
        stream.write(client.userName+" disconnected from chat\n" )
        for(let i = 0; i<clients.length; i++){
            if(client.userName === clients[i].userName){
                clients.splice(i,1)
            }
            else{
                clients[i].write(client.userName+" disconnected from chat")
            }
        }  
    })

}).listen(3112);

console.log("Listening to port 3112");
