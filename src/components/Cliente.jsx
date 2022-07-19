
import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {

    const navigate = useNavigate()

    const { nombre, empresa, email, telefono, notas, id} = cliente

  return (
    <tr className='border-b hover:bg-gray-100'>
      <td className="p-3 font-bold">{nombre}</td>
      
      <td className="p-3">
            <p className="font-bold"><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
            
            {telefono && (<p className="font-bold"><span className='text-gray-800 uppercase font-bold'>Telefono: </span>{telefono}</p>)}
            
                
        </td>
      
      <td className="p-3 font-bold">{empresa}</td>
      
      <td className="p-3">

      <button
            type="button"
            className='bg-green-500 hover:bg-green-700 block w-full text-white uppercase p-2 font-bold text-xs mt-3'
                onClick={ () => navigate(`/clientes/${id}`)}
            >
            
        Ver</button>

        <button
            type="button"
            className='bg-blue-600 hover:bg-blue-700 block w-full
            text-white uppercase p-2 font-bold text-xs mt-3'
            onClick={()=> navigate(`/clientes/editar/${id}`)}>
        Editar</button>

        <button
            type="button"
            className='bg-red-600 hover:bg-red-700 block w-full
            text-white uppercase p-2 font-bold text-xs mt-3'
            onClick={()=> handleEliminar(id)}>
        Eliminar</button>
        
      </td>
    </tr>
  )
}

export default Cliente
