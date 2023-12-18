
import { useState, useEffect } from 'react'
import CloseBtn from '../img/cerrar.svg'
import { Mensaje } from './Mensaje';


export const Modal = ({ setModal, 
    setAnimarModal, 
    animarModal, 
    guardarGasto,
     gastoEditar, 
     setGastoEditar,
     }) => {

    const [mensaje, setMensaje] = useState('');
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');


    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
            
        }
    }, [gastoEditar])
    

    const closeModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 2000);
            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha });
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CloseBtn}
                    alt='Cerrar Modal'
                    onClick={closeModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}

            >
                <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo gasto' }</legend>
                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>

                    <input id='nombre'
                        type='text'
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>

                    <input id='cantidad'
                        type='number'
                        placeholder='Añade la cantidad del gasto: ej 300'
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>Categoría</label>

                    <select id='categoria'
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option disabled >--Categorias--</option>
                        <option value='ahorros'>Ahorros</option>
                        <option value='salud'>Salud</option>
                        <option value='comida'>Comida</option>
                        <option value='alquiler'>Alquiler</option>
                        <option value='ocio'>Ocio</option>
                        <option value='gastos'>Gastos Varios</option>
                        <option value='otros'>Otros</option>
                    </select>
                </div>
                <input style={{
                    backgroundColor: '#3c0470'
                }} type='submit'
                    value={  gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto' }
                />
            </form>
        </div>
    )
}
