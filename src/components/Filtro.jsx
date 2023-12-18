import { useState, useEffect } from 'react'

export const Filtro = ({ filtro, setFiltros }) => {
    return (
        <div className='filtros sombra contenedor'>
            <form>
                <div className='campo'>
                    <label>Filtrar Gastos</label>
                    <select
                        value={filtro}
                        onChange={(e) => setFiltros(e.target.value)}


                    >
                        <option value=''>-- Todas las categorías --</option>
                        <option value='ahorros'>Ahorros</option>
                        <option value='salud'>Salud</option>
                        <option value='comida'>Comida</option>
                        <option value='alquiler'>Alquiler</option>
                        <option value='ocio'>Ocio</option>
                        <option value='gastos'>Gastos Varios</option>
                        <option value='otros'>Otros</option>
                    </select>

                </div>
            </form>
        </div>
    )
}
