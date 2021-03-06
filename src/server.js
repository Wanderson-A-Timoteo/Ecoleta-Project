const express = require("express")
const server = express()

// Pegar o banco de dados
const db = require("./database/db")


// Configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação, linha 40... 
server.use(express.urlencoded({
    extended: true
}))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar rotas da minha aplicação
// página inicial
// req: pergunta ao servidor
// res: resposta do servidor
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Um título"
    })
})



server.get("/create-point", (req, res) => {

    // req.query são as Query Strings da URL
    //console.log(req.query)

    return res.render("create-point.html")

})


server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulario
    //console.log(req.body)

    // inserir dados no banco de dados 

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            address3,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.address3,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no casdastro!")
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", {
            saved: true
        })
    }


    db.run(query, values, afterInsertData)

})



server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {
            total: 0
        })

    }

    // Pegar os dados do banco de dados
    // LIKE fará com que se pegue no banco de dados todos os cadastros com uma palavra em cumum, antes e depois da palavra 
    // Ex: sul, vai buscar as citys: Rio do sul, Chapadão do sul entre outras se estiver cadastrados 
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        // Conta quantos objetos são pegos do banco de dados
        const total = rows.length

        // Mostrar a página html com os dados pegos do banco de dados
        return res.render("search-results.html", {
            places: rows,
            total: total
        })
    })

})


// ligar o servidor
server.listen(3000)