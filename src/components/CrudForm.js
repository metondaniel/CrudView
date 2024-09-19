import React from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CrudService from '../Services/CrudService';

const CrudForm = ({ person, onSuccess }) => {
    const initialValues = person || { name: '', age: '' };

    
    const validationSchema = Yup.object({
      name: Yup.string().required('Nome é obrigatório'),
      age: Yup.number().required('Idade é obrigatória').min(1, 'Idade deve ser positiva'),
    });
  
    
    const handleSubmit = async (values, { resetForm }) => {
      try {
        if (person) {
          
          await CrudService.updatePerson({ id: person.id, ...values });
        } else {
          
          await CrudService.createPerson(values);
        }
        resetForm(); 
        onSuccess(); 
      } catch (error) {
        console.error('Erro ao salvar a pessoa', error);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          {person ? 'Editar Pessoa' : 'Adicionar Pessoa'}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true} 
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="name"
                    value={values.name} 
                    onChange={handleChange}  
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Idade"
                    name="age"
                    type="number"
                    value={values.age}  
                    onChange={handleChange}  
                    error={touched.age && Boolean(errors.age)}
                    helperText={touched.age && errors.age}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained" color="primary">
                    {person ? 'Atualizar' : 'Criar'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    );
  };

export default CrudForm;
