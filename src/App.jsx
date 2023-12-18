import { useState, useEffect } from "react"
import { Header } from "./components/Header"
import IconNewSpend from './img/nuevo-gasto.svg'
import { generateId } from "./helpers"
import { Modal } from "./components/Modal"
import { ListadoGastos } from "./components/ListadoGastos"
import { Filtro } from "./components/Filtro"


function App() {

  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem("gastos")) ?? [])
  ]);

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto') ?? 0)
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtros, setFiltros] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    Number(localStorage.setItem('presupuesto', presupuesto ?? 0))
  }, [presupuesto])

  useEffect(() => {
    Number(localStorage.setItem('gastos', JSON.stringify(gastos) ?? []))
  }, [gastos])

  useEffect(() => {
    if (filtros) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtros)

      setGastosFiltrados(gastosFiltrados) 
    }
  }, [filtros])
  


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }

  }, [])





  const handleNewSpend = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  const guardarGasto = gasto => {

    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
    }

    else {
      //Nuevo Gasto
      gasto.id = generateId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);

  }


  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
    setGastoEditar({})
  }


  return (
    <div className={modal ? 'fijar' : ''}>

      <Header
        gastos={gastos}
        setGastos={ setGastos }
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main >
            <Filtro
              filtros={filtros}
              setFiltros={setFiltros}
            
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtros={ filtros }
              gastosFiltrados={gastosFiltrados}

            />
          </main >
          <div className="nuevo-gasto">
            <img
              src={IconNewSpend}
              alt="Icono new Spend"
              onClick={handleNewSpend}
              style={{

              }}

            />
          </div>
        </>
      )}

      {modal &&
        <Modal setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}



    </div>
  )
}

export default App
