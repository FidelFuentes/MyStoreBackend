const express = require('express')
const {faker}= require('@faker-js/faker')

const routerUser =express.Router()

routerUser.get('/' , (req,res) => {
  const {limit, offset} = req.query
 if(limit && offset){
  res.json({
    limit,offset
  })
 } else {
  res.send('no estan esos parametros')
 }
 })
 /* routerUser.delete('/:id', (req,res)=>{
  const {id} = req.params

  res.json(
    {
      message: 'lo elimine',

      id
    }
  )
})
*/

 module.exports =routerUser
