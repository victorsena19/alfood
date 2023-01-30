import {TextField, Button, Box, Typography} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FormularioRestaurante = () =>{
    
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    
    const parametros = useParams();

    useEffect(() => {
        if(parametros.id){
        axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(response => {
            setNomeRestaurante(response.data.nome);
        })
        }
    }, [parametros]);

    
    
    const salvar = (evento:React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if(parametros.id){
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`,
            {nome: nomeRestaurante})
            .then(() => alert('Cadastro atualizado com sucesso'));
        }else{
            axios.post('http://localhost:8000/api/v2/restaurantes/', 
            {nome: nomeRestaurante})
            .then(() => alert('Restaurante cadastrado com sucesso'));
            }
    }

    return(
        <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center', translate:'0% 250%'}}>
            <Box component='form' onSubmit={salvar}>
            <Typography component='h1' variant='h6'>Formulario de Restaurantes</Typography>
                <TextField 
                    value={nomeRestaurante} 
                    onChange={evento => setNomeRestaurante(evento.target.value)} 
                    label='Cadastrar Restaurante' variant='standard'
                    fullWidth>
                </TextField>
                <Button fullWidth type='submit' variant='outlined'> Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante;