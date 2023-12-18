import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Swal from 'sweetalert2'

export const ControlPresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto }) => {



    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)


    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)

        const totalDisponible = presupuesto - totalGastado

        //Calcular el porcentaje 
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100 ).toFixed(2)

        setGastado(totalGastado)
        setDisponible(totalDisponible)
        setPorcentaje(nuevoPorcentaje)

    }, [gastos])

    const handleReset = () => {
        Swal.fire({
            title: "Desea reiniciar el presupuesto?",
            text: "Esto no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#31045c",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Reiniciar!"
          }).then((result) => {
            if (result.isConfirmed) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
              Swal.fire({
                title: "Reiniciado!",
                text: "Tu presupuesto se reinicio.",
                icon: "success"
              });
            }
          });
    }



    const formatMoney = (cantidad) => {
        return Number(cantidad).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar

                    
                    styles={buildStyles({
                        textSize: '5px',
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3c0470',
                        trailColor: '#d6d6d6',
                        textColor: porcentaje > 100 ? '#dc2626' : '#3c0470',
                        
                    })}
                    value={ porcentaje }
                    text={ `${porcentaje}% Gastado` }
                >

                </CircularProgressbar>
            </div>

            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={ handleReset }>
                    Resetear presupuesto
                </button>
                <p>
                    <span>Presupuesto: </span> {formatMoney(presupuesto)}
                </p>

                <p className={ `${disponible < 0 ? 'negativo' : ''} `}>
                    <span>Saldo disponible: </span> {formatMoney(disponible)}
                </p>

                <p>
                    <span>Saldo Gastado: </span> {formatMoney(gastado)}
                </p>
            </div>

        </div>
    )
}
