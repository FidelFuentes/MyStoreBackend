const express = require('express')
const {faker}= require('@faker-js/faker')

const routerCategories = express.Router()

routerCategories.get('/:cid/products/:pid', (req,res) =>{
  const {cid,pid}= req.params
  res.json(
    {cid,
    pid,
   celular : 'iphone',
   precio: 4000}
  )
})

module.exports= routerCategories;
