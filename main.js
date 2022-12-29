// class TicketManager{
//     static idIncremento = 0;
//     constructor(){
//         this.evento = [];
//     }
//     #precioBaseGanancias =0.15;
//     getEventos(){
//        return this.evento;
//     }
    
//     agregarEventos(nombre, lugar, precio, capacidad, fecha){
//         const capacity = capacidad ?? 50;
//         const date = fecha ?? new Date().toLocaleDateString();
//         TicketManager.idIncremento++
//         const nuevoEvento = {
//             id: TicketManager.idIncremento,
//             nombre,
//             lugar,
//             precio: precio * (1+ this.#precioBaseGanancias),
//             capacidad: capacity,
//             fecha: date,
//             participantes: []
//         }
//         this.evento.push(nuevoEvento);
//     }

//     agregarUsuario(idEvent, idUsuario){
//         const validacionEvent = this.evento.find(event => event.id === idEvent)
//         if(!validacionEvent){
//             console.error('No se encontro evento :(');
//             return;
//         }
//         const usuario = this.evento.participantes.includes(idUsuario);
//         if(usuario){
//             console.error('tu usuario ya esta registrado');
//             return;
//         }
//     }

//     ponerEventoEnGira(idEvent, nuevoLugar, nuevaFecha){
//         const encontrarEvento = this.evento.findIndex(event => event.id === idEvent);
//         if(encontrarEvento > 0){
//             console.error('no se encontro evento!');
//             return;
//         }
//         const copiaEvento = this.evento[encontrarEvento];
//         TicketManager.idIncremento++
//         const nuevoEvento = {
//            ...copiaEvento,
//            id:TicketManager.idIncremento,
//            lugar: nuevoLugar,
//            fecha:nuevaFecha,
//         }
//         this.evento[encontrarEvento] = nuevoEvento;
//     }
// }

class ProductManager {
static idIncremento = 0;

    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProducts(titulo, descripcion, precio, miniatura, codigo, stock){
        ProductManager.idIncremento++;
        const code = this.products.find(c => c.codigo === codigo); 
            const nuevoProducto = {
                id:ProductManager.idIncremento,
                title: titulo,
                desc: descripcion,
                price: precio,
                thumbnai: miniatura,
                codigo: codigo,
                stock: stock,
            } 

            const productoValidar = Object.values(nuevoProducto);
            const validarValores = productoValidar.filter( e=> e !== undefined);
            if(validarValores.length < 7){
              console.error('faltan parametros');
              return;
            }
          if(code){
            console.error('ya existe este codigo');
            return;
        }
            return this.products.push(nuevoProducto);
       
    }

    

    getProductsById(idP){
        const encontrar = this.products.findIndex(e => e.id === idP);
        if(encontrar < 0){
            console.error('Not found');
            return;
        }
        const productoEncontrado = this.products[encontrar];
        return productoEncontrado; 
    }
};

const myProductManager = new ProductManager();
console.log(myProductManager.getProducts());
console.log(myProductManager.addProducts( 'Producto Prueba','Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25));
console.log(myProductManager.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25));
console.log(myProductManager.addProducts( 'Este es un producto prueba', 200, 'Sin imagen', 'abc1234', 25));
console.log(myProductManager.getProducts());
console.log(myProductManager.getProductsById(1));


const suma = (num, numSuma)=>{
    return new Promise((resolve,reject)=>{
      if(num + numSuma === 0){
        reject('no se puede sumar un numero que de 0')
      }if(num === 0 || numSuma === 0){
        reject('operacion incecesaria')
      }else{
        resolve(num + numSuma);
      };
    })
  };
  const resta = (num, numResta)=>{
    return new Promise((resolve,reject)=>{
      if(num === 0 || numResta === 0){
        reject('no se puede restar un numero que de 0');
      }if(num-numResta < 0){
        reject('no se devuelven numeros negativos');
      }if(num - numResta === 0){
        reject('operacion invalida');
      }
      else{
        resolve(num - numResta);
      };
    })
  };
  
  const multi = (num, mult)=>{
    return new Promise((result,reject)=>{
      if(num*mult < 0){
        reject('La calculadora solo devuelve valores positivos');
      } if(num === 0 || mult === 0){
        reject('no se puede multiplicar un numero que sea 0');
      }else{
        result(num*mult);
      };
    })
  };
  
  
  const Calculos = async()=>{
    try{
      let resultado = await multi(1,2);
      console.log(resultado);
    }
    catch(error){
      console.log(error);
    }
  };
  
  Calculos();