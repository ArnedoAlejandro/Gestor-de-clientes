import { useState, useEffect } from "react"
import  Cliente  from "../components/Cliente"


const Inicio = () => {

//VALORES DE LOS CLIENTES TRAIDOS DESDE LA API
  const [ clientes, setClientes ] = useState([])
  
  useEffect(() =>{

    const obtenerClientesAPI = async ()=>{
      try{
        const url = "http://localhost:4000/clientes"
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        console.log(resultado)
        setClientes(resultado)

      }catch(e){
        console.log(e)
      }
    }
    obtenerClientesAPI()
  },[] )

//FUNCION DE ELIMINAR CLIENTE
  const handleEliminar =async (id) =>{
    const confirmar = confirm("¿Desea eliminar este cliente?")

    if(confirm){
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url, {
          method : "DELETE"
        })
        await respuesta.json()
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)
        
      } catch (error) {
        
      }

    }
  }

  return (

    <div>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administrar tus Clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">  
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        
        <tbody>
          {clientes.map(cliente=>(
             <Cliente 
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Inicio
