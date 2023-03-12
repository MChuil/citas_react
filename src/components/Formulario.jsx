import { useState, useEffect } from "react"
import Error from "./Error"

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [ error, setError ] = useState(false)
  
  useEffect(()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId =()=>{
    const random = Math.random().toString(36).substring(2)
    const fecha =  Date.now().toString(36)
    return fecha + random
  }
  const handleSubmit = (e)=>{
  e.preventDefault();

    //Validando formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('ALguno vacio')
      setError(true)
      return
    }
    
    setError(false)

    //objeto paciente
    const objetoPaciente = {
      nombre,
      propietario, 
      email, 
      fecha, 
      sintomas,
    }

    if(paciente.id){  
      //Editando
      objetoPaciente.id = paciente.id
      const pacientesActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizado)
      setPaciente({})
    }else{
      //Nuevo registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }


    //Reiniciar form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="mt-5 text-center text-lg mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>


      <form onSubmit = {handleSubmit} className="bg-white rounded-lg shadow-md py-10 px-5 mb-10">
        { error && <Error mensaje='Todos los campos son obligatorios' />}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre de la mascota</label>
          <input type="text" id="mascota" placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={nombre} onChange={ (e) => setNombre(e.target.value) } />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre de propietario</label>
          <input type="text" id="propietario" placeholder="Nombre del propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={propietario} onChange={ (e) => setPropietario(e.target.value) } />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input type="email" id="email" placeholder="Tu correo electronico" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={ (e) => setEmail(e.target.value) } />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="block text-gray-700 uppercase font-bold">Fecha</label>
          <input type="date" id="fecha" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={ (e) => setFecha(e.target.value) }/>
        </div>
        <div className="mb-5">
          <label htmlFor="sitomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
          <textarea id="sintomas" cols="30" rows="10" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={sintomas} onChange={ (e) => setSintomas(e.target.value) }></textarea>
        </div>
        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all" value={ paciente.id ? 'Editar paciente' : 'Agregar paciente' } />

      </form>
    </div>
  )
}

export default Formulario
