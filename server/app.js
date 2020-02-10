const controller = require('./controller')
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const auth = require('./middleware/authentication')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())




app.post('/login', controller.login)
app.post('/register', controller.register) 

app.use(auth)
app.get('/comics', controller.showcomic)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))