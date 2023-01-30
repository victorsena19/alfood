import {TextField, Button, Box, Typography, Select, InputLabel, MenuItem, FormControl} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';
import ITags from '../../../interfaces/ITags';

const FormularioPratos = () =>{
    
    const [tags, setTags] = useState<ITags[]>([])


    const [nomePratos, setNomePratos] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tag, setTag] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    
    const parametros = useParams();

    useEffect(() => {
        axios.get<{tags: ITags[]}>('http://localhost:8000/api/v2/tags/')
        .then(response => 
            setTags(response.data.tags)
        );

        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(response => 
                setRestaurantes(response.data)
        );
    }, []);
    

    useEffect(() => {
        if(parametros.id){
        axios.get(`http://localhost:8000/api/v2/pratos/${parametros.id}/`)
        .then(response => {
            setNomePratos(response.data.nome);
            setDescricao(response.data.descricao);
            setTag(response.data.tag);
            setImagem(response.data.imagem);
        })
        }
    }, [parametros]);

    
    //Inicio Função
    const salvar = (evento:React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePratos);
        formData.append('descricao', descricao);
        formData.append('tag', tag);
        formData.append('restaurante', restaurante);
        if(imagem){
        formData.append('imagem', imagem);
        }
        if(parametros.id){
            axios.request({
                url: `http://localhost:8000/api/v2/pratos/${parametros.id}/`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, data: formData
            })
            .then(() => {
                setNomePratos('');
                setDescricao('');
                setTag('');
                setRestaurante('');
                setImagem(null);
                alert('Prato Atualizado com Sucesso')})
        }
        else{
            axios.request({
                url: 'http://localhost:8000/api/v2/pratos/',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, data: formData
            })
            .then(() => {
            setNomePratos('');
            setDescricao('');
            setTag('');
            setRestaurante('');
            setImagem(null);
            alert('Prato Cadastrado com Sucesso')});
            
        }
        

    }
    //Final da Função

    //Inicio Função
    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) =>{
        if(evento.target.files?.length){
           setImagem(evento.target.files[0]);
        }else{
            setImagem(null);
        }
    }
     //Final da Função

    return(
        <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
            <Box component='form' onSubmit={salvar}>
            <Typography component='h1' variant='h6'>Formulario de Pratos</Typography>
                <TextField 
                    required
                    value={nomePratos} 
                    onChange={evento => setNomePratos(evento.target.value)} 
                    label='Nome do Prato' variant='standard'
                    fullWidth
                    margin='dense'>
                </TextField>
                <TextField 
                    required
                    value={descricao} 
                    onChange={evento => setDescricao(evento.target.value)} 
                    label='Descrição' variant='standard'
                    fullWidth
                    margin='dense'>
                </TextField>

                <FormControl margin='dense' fullWidth>
                <InputLabel margin='dense' id='select-tag'>Tags</InputLabel>
                    <Select labelId='select-tag'
                        required
                        value={tag} 
                        onChange={evento => setTag(evento.target.value)} 
                        variant='standard'>
                            {tags.map(tag =>
                                <MenuItem value={tag.value} key={tag.id}>{tag.value}</MenuItem>)}
                            
                    </Select>
                </FormControl>

                <FormControl margin='dense' fullWidth>
                <InputLabel margin='dense' id='select-restaurantes'>Restaurantes</InputLabel>
                    <Select labelId='select-restaurantes'
                        required
                        value={restaurante} 
                        onChange={evento => setRestaurante(evento.target.value)} 
                        variant='standard'>
                            {restaurantes.map(restaurante =>
                                <MenuItem value={restaurante.id} key={restaurante.id}>{restaurante.nome}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl margin='dense' fullWidth>
                <InputLabel sx={{marginTop:'-15px'}}>Imagem do Prato</InputLabel>
                <TextField
                    onChange={selecionarArquivo}
                    variant='filled'
                    type='file'
                    margin='dense'>
                </TextField>
                </FormControl>
                <Button fullWidth type='submit' variant='outlined'> Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioPratos;