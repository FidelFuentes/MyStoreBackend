const boom = require('@hapi/boom')

function validationHandler(schema, property){
//closure =>  funcion que retorna una funcion
  return (req,res,next) =>{
    const data= req[property] // con esto permita que la inf venga dinamica, si es de params, body o query
    const {error} = schema.validate(data, {abortEarly : false})// hago que me muestre todos los errores de una con el abort.

    if(error){
      next(boom.badRequest(error)) //le envio el error a los middleware
    }
    next()
  }
}

module.exports = validationHandler
