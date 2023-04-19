const {faker}= require('@faker-js/faker');
const { promises } = require('dns');


const boom = require('@hapi/boom')

class ProductService {

  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit= 100;

    for (let index = 0; index < limit; index++) {

      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
    // los endpoint de tipo create lo retornan normalmente
  }

  async find(){
    return new Promise((resolve,reject) =>{
      setTimeout(() =>{
        resolve(this.products)
      },2000)
    })

  }

  async findOne(id){

    const product= this.products.find(item => item.id == id)
    if(!product){
      throw boom.notFound('product not found')
    }

    if(product.isBlock){
      throw boom.conflict('product is block')
    }
    return product
  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id == id)
    // encuentro la posicion en memoria.
    if(index == -1){
      // index -1 es cuando no encuentro el elemento
      //throw new Error('no lo encontre')
      throw boom.notFound('product not found')
      // libreria para el manejo de errores.
    }
    const product= this.products[index]
    // de esta forma mantengo la informacion que tenia antes, y le cambio la nueva
    this.products[index] = {
      ...product,
      ...changes
    }
    // guardo los cambios.
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)

    if(index === -1){
      throw new Error('no lo encontre')
    }

    this.products.splice(index,1)
    // encuentro la posicion y le indico cuantos elementos quiero eleminar a partir de la posicion.
    return { id}

  }

}

module.exports = ProductService
