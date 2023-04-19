const express =require('express')

const productsRouter= require('./productsRouter')
const userRouter = require('./userRouter')
const categoriesRouter = require('./categoriesRouter')




const routerApi = (app) => {
  const router = express.Router()
  //enrutado por versiones.

  app.use('/api/v1',router)
  router.use('/products', productsRouter)
  router.use('/users',userRouter)
  router.use('/categories',categoriesRouter)
}
// aca le digo que ponga siempre el /products


module.exports = routerApi
