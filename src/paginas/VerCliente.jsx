//HOOK QUE LEE LOS ID
import { useParams }from "react-router-dom"
import { useState,useEffect} from "react"

const VerCliente = () => {

    const [cliente, setCliente ] = useState({})

    const { id } = useParams();

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

//VALIDACION SI EL OBJETO EXISTE 
    Object.keys(cliente).length === 0 ? 
        <h1 className="font-black text-4xl text-blue-900 text-center ">Cliente Inexistente</h1> 
        : (    
        <div>
            <h1 className="font-black text-4xl text-blue-900 ">Ver Cliente: {cliente.nombre}</h1>
            <p className=" font-black text-2xl text-blue-900 mt-3">Informacion del Cliente</p>

            <p className="text-3xl  text-gray-800 mt-5 uppercase">
                <span className="text-gray-600 uppercase font-bold">Cliente: </span>
            {cliente.nombre}</p>

            <p className="text-gray-800 mt-3 text-2xl ">
                <span className="text-gray-600 uppercase font-bold">Empresa: </span>
            {cliente.empresa}</p>
            
            <p className="text-gray-800 mt-3 text-2xl">
                <span className="text-gray-600 uppercase font-bold">Email: </span>
            {cliente.email}</p>

            {cliente.telefono && (
                <p className="text-gray-800 mt-3 text-2xl">
                <span className="text-gray-600 uppercase font-bold">Telefono: </span>
            {cliente.telefono}</p>
            )}
            
            {cliente.notas && (   
                <p className="text-gray-800 mt-3 text-2xl">
                <span className="text-gray-600 uppercase font-bold">Notas: </span>
            {cliente.notas}</p>
            )}
        </div>
    )
  )
}

export default VerCliente
