import React, { useState, useEffect } from 'react';
import { Button, TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IRestaurante from '../../../interfaces/IRestaurante';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(response => {
                setRestaurantes(response.data)
            })
            .catch(erro => {
                console.log(erro)
            })
    }, [])

    const excluir = (restauranteExcluido: IRestaurante) => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExcluido.id}/`)
        .then(() => {
            const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id);
            setRestaurantes([...listaRestaurantes]);
        });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {restaurantes.map((item) => <TableRow key={item.id}>
                            <TableCell>
                                {item.nome}
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined'  color='info'>
                                    <Link style={{textDecoration:'none'}} to={`/admin/restaurantes/${item.id}`}>
                                        Editar
                                    </Link>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined' color='error' onClick={() =>excluir(item)}>
                                    Excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </TableContainer>
    )

}

export default AdministracaoRestaurantes;