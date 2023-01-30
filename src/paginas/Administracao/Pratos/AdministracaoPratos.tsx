import React, { useState, useEffect } from 'react';
import { Button, TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from 'axios';
import { Link } from 'react-router-dom';
import IPrato from '../../../interfaces/IPrato';

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([]);

    useEffect(() => {
        axios.get<IPrato[]>('http://localhost:8000/api/v2/pratos/')
            .then(response => {
                setPratos(response.data)
            })
            .catch(erro => {
                console.log(erro)
            })
    }, [])

    const excluir = (pratoExcluido: IPrato) => {
        axios.delete(`http://localhost:8000/api/v2/pratos/${pratoExcluido.id}/`)
        .then(() => {
            const listaPratos = pratos.filter(prato => prato.id !== pratoExcluido.id);
            setPratos([...listaPratos]);
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
                            Tags
                        </TableCell>
                        <TableCell>
                            Imagens
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
                    {pratos.map((item) => <TableRow key={item.id}>
                            <TableCell>
                                {item.nome}
                            </TableCell>
                            <TableCell>
                                {item.tag}
                            </TableCell>
                            <TableCell>
                                {item.imagem}
                            </TableCell>
                            <TableCell>
                                <Button variant='outlined'  color='info'>
                                    <Link style={{textDecoration:'none'}} to={`/admin/pratos/${item.id}`}>
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

export default AdministracaoPratos;