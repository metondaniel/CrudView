import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import crudService from '../Services/CrudService';

const CrudList = ({ onEdit }) => {
    const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await crudService.getAllPersons();
      setPersons(response);
    };
    fetchPersons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
      await crudService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Pessoas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {persons.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.age}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => onEdit(person)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(person.id)} style={{ marginLeft: '10px' }}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CrudList;
