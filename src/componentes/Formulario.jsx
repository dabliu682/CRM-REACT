import React from 'react'
import {Formik, Form, Field} from 'formik'
import { useNavigate} from 'react-router-dom'
import * as Yup from 'yup' 
import Alerta from './Alerta'

const Formulario = () => {

    const navigate = useNavigate()

    const handleSubmit = async (valores) =>{
        try {
            const url='http://localhost:4000/clientes'
            
            const respuesta = await fetch(url, {
                method: 'POST',
                body:JSON.stringify(valores),
                headers:{
                    'Content-Type':'application/json'
                }
            })

            console.log(respuesta)
            const resultado = await respuesta.json()
            console.log(resultado)  

            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }

    const nuevoClienteShema = Yup.object().shape({
        nombre: Yup.string().required('El nombre no puede ser vacio').min(3, 'El nombre es muy corto').max(200,'El nombre es muy largo'),
        empresa: Yup.string().required('Empresa no puede ser vacio'),
        email: Yup.string().required('El nombre no puede ser vacio').email('Email no valido'),
        telefono: Yup.number().positive('Numero no valido').integer('Numero no valido').typeError('Numero no valido')
    })
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar cliente</h1>
        <Formik
            initialValues={{
                nombre:'',
                empresa:'',
                email:'',
                telefono:'',
                notas:'',
            }}

            onSubmit={ async (values, {resetForm}) =>{
                await handleSubmit(values)
                resetForm()
            }}

            validationSchema={nuevoClienteShema}
        > 
        
        {({errors, touched}) => { 
            return (         
            <Form className="mt-10">
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='nombre'>Nombre:</label>
                    <Field
                        id='nombre'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='Nombre del cliente'
                        name='nombre'
                    />
                    {errors.nombre && touched.nombre ? (<Alerta>{errors.nombre}</Alerta>) : null}
                </div>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='empresa'>Empresa:</label>
                    <Field
                        id='empresa'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='empresa del cliente'
                        name='empresa'
                    />
                    {errors.empresa && touched.empresa ? (<Alerta>{errors.empresa}</Alerta>) : null}
                </div>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='email'>E-mail:</label>
                    <Field
                        id='email'
                        type='email'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='E-mail del cliente'
                        name='email'
                    />
                    {errors.email && touched.email ? (<Alerta>{errors.email}</Alerta>) : null}
                </div>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='telefono'>Telefono:</label>
                    <Field
                        id='telefono'
                        type='tel'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='Telefono del cliente'
                        name='telefono'
                    />
                    {errors.telefono && touched.telefono ? (<Alerta>{errors.telefono}</Alerta>) : null}
                </div>
                <div className='mb-4'>
                    <label className='text-gray-800' htmlFor='notas'>Notas:</label>
                    <Field
                        as='textarea'
                        id='notas'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-50h-40'
                        placeholder='Notas del cliente'
                        name='notas'
                    />
                   
                </div>
                <input 
                    type='submit'
                    value='Agregar cliente'
                    className='mt-5 w-full p-3 bg-blue-800 text-white uppercase font-bold text-lg'
                />
            </Form>
        )}}
        </Formik>
    </div>
  )
}

export default Formulario