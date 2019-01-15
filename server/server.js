const express = require('express')
const next = require('next')
const db = require('./database')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport');
require('./auth')(passport)


//WRITE DOWN API ROUTES HERE
const posts = require('./routes/posts') //we will give this object to server.use() 
const news = require('./routes/news')
const user = require('./routes/user')



app.prepare()
.then(() => {
  //CONFIGURATION PART OF SERVER
  const server = express()
  server.use(cookieParser())
  server.use(bodyParser.json())
  server.use(passport.initialize());
server.use(session({
  secret: 'jumpingdonger',
  resave: true,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }, // users auth session will expire after 4 hours.
}))
//Passport Middleware
server.use(passport.initialize())
server.use(passport.session())

  //ADD API ROUTES TO SERVER HERE!
  server.use('/api',posts)
  server.use('/api',news)
  server.use('/api',user)
//

//NEXT.JS ACTUAL SERVER SIDE ROUTES ARE GOING BELOW


  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
    
})




  server.get('*', (req, res) => {
    return handle(req, res)
  })


  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})