import React from 'react'
import { Formik, Form, Field } from 'formik'
// useNavigate NOS PERMITE REDIRECCIONAR A OTRA URL
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({cliente}) => {

//REDIRECCION UTILIZANDO useNavigate AL ENVIAR DATOS DEL FORMULARIO
    const navigate = useNavigate()

//CREACION DE NUESTRA REST API
    const handleSubmint = async (values) =>{
        try {
            let respuesta
//EDITAR REGISTRO
           if(cliente.id){
            const url = `http://localhost:4000/clientes/${cliente.id}`
            respuesta = await fetch(url,{
//SE UTILIZA EL METODO PUT PARA MODIFICAR VALORES DEL FORMULARIO
                method : 'PUT',
                body : JSON.stringify(values),
                headers : {
                    "Content-Type" : "application/json"
                }
            })

           }else{
//NUEVO REGISTRO
            const url = 'http://localhost:4000/clientes'

            respuesta = await fetch(url , {
//UTILIZAMOS EL METODO POST PARA AGREGAR 
                method : 'POST',
                body : JSON.stringify(values),
//Una solicitud POST, PUT o PATCH debe incluir un Content-Type: application/jsonencabezado 
//para usar el JSON en el cuerpo de la solicitud
                headers :{
                    'Content-Type': 'application/json'
                }    
            })
            
           }

            await respuesta.json()
            
//REDIRECCION A LA URL DE /CLIENTES
            navigate("/clientes")
        } catch (error) {
            
        }
    }

//CREACION DE SCHEMA INGRESAMOS LOS DATOS QUE VAMOS A RECIBIR DE NUESTRO FORMULARIO
    const nuevoClienteSchema = Yup.object().shape({
            nombre: Yup.string()
                .min(3, "El nombre es muy corto")
                .max(20, "El nombre es muy largo")
                .required("El nombre es obligatorio"),

            empresa: Yup.string()
                .required("El campo es obligatorio"),
            
            email: Yup.string()
                .required("El email es obligatorio")
                .email("Indique un email valido"),
            //En este caso no se le puede pasar el error al metodo por lo tanto se crea mediante un typeError
                telefono : Yup.number()
                //Numeros solos enteros
                .integer("Numero no valido")
                //Numero positivo
                .positive("Numero no valido")
                .typeError("El numero no es valido")

    })

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className="text-xl text-gray-600 font-bold uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar CLiente"}
        </h1>
        <Formik  
        //VALIDACION DE LOS VALORES DEL FORMULARIO
            initialValues = {{
                nombre: cliente.nombre ? cliente.nombre : "",
                empresa: cliente?.empresa ?? "",
                email: cliente?.email ?? "",
                telefono : cliente?.telefono ?? "",
                notas: cliente?.notas ?? ""
            }}

//enableReinitialize Controla si se tiene que restablecer el formulario si cambia initialValues
            enableReinitialize = {true}

            //EVENTO SUBMINT
            onSubmit={async (values, {resetForm}) => { //value == VALORES DEL FORMULARIO
                await handleSubmint(values)
                //RESETEAMOS EL FORMULARIO
                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
            
        >
            
            { ({ errors, touched }) => {
              
            return(
            
            //FUNCION QUE CAPTURA TODA LA INFORMACION DEL FORMULARIO
            <Form
                className='mt-10'
            >
                <div className="mb-4">
                    <label className='text-gray-800' htmlFor="nombre">
                        Nombre:
                    </label>
                    <Field 
                        type="text"
                        id="nombre"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Nombre del Cliente"
                        name="nombre"
                    />
                    
                    { errors.nombre && touched.nombre ?
                        (<Alerta>{errors.nombre}</Alerta>
                        ): null }

                </div>
                
                <div className="mb-4">
                    <label className='text-gray-800' htmlFor="empresa">
                        Empresa:
                    </label>
                    <Field 
                        type="text"
                        id="empresa"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Empresa del Cliente"
                        name="empresa"
                    />
                    { errors.empresa && touched.empresa ?(
                        <Alerta>{errors.empresa}</Alerta>
                    ): null }
                 
                </div>

                <div className="mb-4">
                    <label className='text-gray-800' htmlFor="email">
                        E-mail:
                    </label>
                    <Field 
                        type="email"
                        id="email"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Email del Cliente"
                        name="email"
                    />
                    { errors.email && touched.email ?
                        (<Alerta>{errors.email}</Alerta>
                    ): null }

                </div>

                <div className="mb-4">
                    <label className='text-gray-800' htmlFor="telefono">
                        Telefono:
                    </label>
                    <Field 
                        type="tel"
                        id="telefono"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Teléfono del Cliente"
                        name="telefono"
                    />
                    { errors.telefono && touched.telefono ?
                        (<Alerta>{errors.telefono}</Alerta>
                    ): null }
                </div>

                <div className="mb-4">
                    <label className='text-gray-800' htmlFor="notas ">
                        Notas:
                    </label>
                    <Field 
                        as="textarea"
                        type="text"
                        id="notas"
                        className="mt-2 block w-full p-3 bg-gray-100 h-30"
                        placeholder="Notas del Cliente"
                        name="notas"
                    />
                </div>

                <input 
                    type="submit"
                    value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase
                        font-bold text-lg text-center'
                    />

            </Form>
            )}}
        </Formik>
    
    </div>
  )
}

Formulario.defaultProps = {
    cliente : {}
}

export default Formulario
