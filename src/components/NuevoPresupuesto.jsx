import { Box, Button, FormLabel, Grid, TextField } from '@mui/material'
import React from 'react'
import Swal from 'sweetalert2';

export const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!presupuesto || presupuesto < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Estás ingresando un presupuesto no válido',

            })
            return
        }

        setIsValidPresupuesto(true)

    }


    return (
        <Grid className='contenedor-presupuesto contenedor sombra'>
            <Box component='form' className='formulario'>
                <Box className='campo'>
                    <FormLabel sx={{ color: '#3c0470', fontFamily: 'inherit', fontWeight: '700', fontSize: 190 }}>Definir presupuesto</FormLabel>
                    <TextField sx={{
                        fontWeight: '700',
                        overflow: 'hidden',
                    }}
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        type='number'
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                        variant='filled'
                    />
                    <Button onClick={handleSubmit} type='submit' size='large' variant='contained' sx={{
                        marginTop: {xs: 8, md: 2},
                        fontSize: 18,
                        bgcolor: '#3c0470',
                        ":hover": {
                            bgcolor: '#650093'
                        }

                    }}
                    >
                        Añadir
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}
