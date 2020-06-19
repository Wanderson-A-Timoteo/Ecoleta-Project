const express =  require("express")
const server =  express()

// Configurar pasta publica
server.use(express.static("public"))

// Configurar rotas da minha aplicação
// página inicial
// req: pergunta ao servidor
// res: resposta do servidor
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
}) 

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html")
}) 


// ligar o servidor
server.listen(3000)

