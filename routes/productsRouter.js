const express = require('express')
//const {faker}= require('@faker-js/faker')
const ProductService = require('./services/productService')
const validationHandler =require('../middlewares/validationHandler')
const {createProductSchema,updateProductSchema,getProductSchema}=require('../schemas/productSchema')
const routerProduct = express.Router()
const service= new ProductService()


routerProduct.get('/', async(req, res)=> {
  //localhost:3001/products?size=2
  // dejo las partes especializadas, no hace falta que ponga el /products.
  // los parametros tipo query son los que agarramos desde la barra y nos dan un formato de lo que queremos obtener, en este caso damos la cantidad limites de products
const products = await service.find()
// con el await estoy recibiendo la informaicon de los productos de forma asincrona.


 res.json(products)
})

routerProduct.get('/filter',(req,res) =>{
 res.send('soy un filter')
})

// los endspoint especificos deben ir por encima de los dinamicos para que la ruta con :id no choque con la de filter
//todos los parametros que recido despues del :id o de tipo query son string
routerProduct.get('/:id',
validationHandler(getProductSchema,'params'), //concateno middleware
async (req,res,next)=>{

  try{
    const {id} =req.params
    const product = await service.findOne(id)

    res.json(product)
  } catch(error){
    next(error)
  }
})


routerProduct.post('/',
validationHandler(createProductSchema,'body'),
async (req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body)
  res.status(201).json(newProduct)
})
// patch es para cambiar algo especifico mientras que put para cambiar la totalidad.

routerProduct.patch('/:id',
validationHandler(getProductSchema,'params'),//validacion doble
validationHandler(updateProductSchema,'body'),
async (req,res,next)=>{

  try{
    const {id} = req.params
    const body = req.body;
    const product = await service.update(id,body)
    res.json(
      product
    )
  } catch(error){
    next(error)
  }

})

routerProduct.delete('/:id', async (req,res)=>{
  const {id} = req.params

  const rta = await service.delete(id)

  res.json(
    rta
  )
})


module.exports= routerProduct;
