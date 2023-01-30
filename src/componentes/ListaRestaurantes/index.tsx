import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

interface IParametrosBusca {
  ordering: string;
  search: string;
}

const ListaRestaurantes = () => {
  const baseUrl: string = 'http://localhost:8000/api/v1/restaurantes/';
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setproximaPagina] = useState('');
  const [paginaAnterior, setpaginaAnterior] = useState('');

  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(response => {
        setRestaurantes(response.data.results);
        setproximaPagina(response.data.next);
        setpaginaAnterior(response.data.previous);
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const opcoes = {
      params: {
        'search': ''
      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca;
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao;
    }
    carregarDados(baseUrl, opcoes);
  }

  useEffect(() => {
    carregarDados(baseUrl)
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <Typography component='h1' variant='h6'>Os restaurantes mais bacanas</Typography><br />
      <Box component='form' onSubmit={buscar} sx={{ display: 'flex', flexDirection: 'row' }}>
        <TextField label='Pesquisar Restaurante' variant='standard' style={{ margin: '0 8px', borderRadius: '5px' }} type='text'
          value={busca} onChange={evento => setBusca(evento.target.value)}>
        </TextField>
        <FormControl size='medium' sx={{minWidth: 120}}>
          <InputLabel id='select-ordenacao'>Ordenação</InputLabel>
          <Select variant='standard'
            labelId="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            label="select-ordenacao"
            onChange={evento => setOrdenacao(evento.target.value)}>
            <MenuItem value=''>Padrão</MenuItem>
            <MenuItem value='id'>ID</MenuItem>
            <MenuItem value='nome'>Nome</MenuItem>
          </Select>
          </FormControl>
        <Button sx={{ padding: '12px, 15px', marginLeft: '15px' }} type='submit' variant='contained'>Buscar</Button>
      </Box>

      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}

      {
        <Button variant='contained' onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
          ver mais
        </Button>
      }
      {
        <Button variant='contained' onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
          Anterior
        </Button>
      }


    </section>
  )
}

export default ListaRestaurantes;