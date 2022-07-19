import Formulario from "../components/Formulario"
import { useParams }from "react-router-dom"
import { useState,useEffect} from "react"



const EditarCliente = ({}) => {

  const [cliente, setCliente ] = useState({})

  const { id } = useParams();//useParams le permiten acceder a los parámetros de la ruta actua

  useEffect(() => {
      const obtenerClienteApi = async()=> {
          try {
              const url = `http://localhost:4000/clientes/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              setCliente(resultado)
          } catch (error) {
              console.log(error)
          }
      }
      obtenerClienteApi()
  },[])



  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900 ">Editar Cliente</h1>
      <p className="mt-3">LLena los campos para editar el clientes</p>

      {cliente?.nombre ? (
        <Formulario
        cliente={cliente} />
      ) : <p>Cliente ID no valido</p>}
      
    </div>
  )
  
}

export default EditarCliente
