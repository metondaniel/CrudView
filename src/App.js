import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import CrudForm from './components/CrudForm';
import CrudList from './components/CrudList';
import { Container, Typography, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CrudService from './Services/CrudService';

const App = () => {
  const [selectedPerson, setSelectedPerson] = useState(null); 
  const [isOpen, setIsOpen] = useState(false);
  const [persons, setPersons] = useState([]); 

  const loadPersons = async () => {
    const response = await CrudService.getAllPersons();
    setPersons(response); 
  };

  useEffect(() => {
    loadPersons();
  }, []);

  const handleOpen = (person = null) => {
    setSelectedPerson(person);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedPerson(null);
    setIsOpen(false);
  };

  const handleSuccess = () => {
    loadPersons(); 
    handleClose();  
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        Gerenciamento de Pessoas
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Adicionar Pessoa
      </Button>

      <CrudList persons={persons} onEdit={handleOpen} />

      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{selectedPerson ? 'Editar Pessoa' : 'Adicionar Pessoa'}</DialogTitle>
        <DialogContent>
          <CrudForm person={selectedPerson} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default App;