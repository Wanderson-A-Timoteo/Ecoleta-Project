const express =  require("express")
const server =  express()

// Pegar o banco de dados
const db = require("./database/db")


// Configurar pasta publica
server.use(express.static("public"))

// utilizando template engine
const nunjucks = require ("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar rotas da minha aplicação
// página inicial
// req: pergunta ao servidor
// res: resposta do servidor
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um título"})
}) 

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
}) 

server.get("/search", (req, res) => {
    
    // Pegar os dados do banco de dados
    
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        // Conta quantos objetos são pegos do banco de dados
        const total = rows.length

        // Mostrar a página html com os dados pegos do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
    
}) 


// ligar o servidor
server.listen(3000)

