const express =  require("express")
const server =  express()

// Configurar rotas da minha aplicação
// página inicial
// req: pergunta ao servidor
// res: resposta do servidor
server.get("/", (req, res) => {
    res.send("Cheguei aqui")
}) 

// ligar o servidor
server.listen(3000)

