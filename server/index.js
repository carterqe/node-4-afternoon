require('dotenv').config()
const express = require('express')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const app = express()

// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
}))
app.use(checkForSession)

app.listen(SERVER_PORT, () => {
  console.log(`${SERVER_PORT} scoops of pre-workout.`)
})

app.use(express.static(`${__dirname}/../build`))
// ENDPOINTS

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)


app.get('/api/swag', swagCtrl.read)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)