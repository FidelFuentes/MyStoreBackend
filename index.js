const express = require('express')
const {faker}= require('@faker-js/faker')
const cors = require('cors')
const routerApi = require('./routes')

const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/errorHandler')


const app = express()

const port= 3001;

app.use(express.json())

const whiteList=['http://localhost:8080','https://myapp.com'] // asi le digo desde donde puedo enviar request
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)){
      callback(null,true)
    } else {
      callback( new Error('no te lo permito'))
    }
  }
}

app.use(cors(options))// de esta manera aceptaria cualquier origen de dominio si no le pongo options

app.get('/',(req, res)=> {

  res.send('holaaa')
})




app.get('/nueva-ruta',(req, res)=> {

  res.send('soy un nuevo endpoint')
})



routerApi(app)


// los middlewares de tipo error se deben hacer despues del routing.



app.use(boomErrorHandler)
app.use(logErrors)
app.use(errorHandler)

// tenemos que ver en que orden se ejecutan. el que no tenga next deberia ir ultimo.

app.listen(port, ()=> {
  console.log(`estoy en el port ${port}`)
})
