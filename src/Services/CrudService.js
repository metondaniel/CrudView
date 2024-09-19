import axios from 'axios';

const API_URL = 'https://localhost:7043/person';

const createPerson = (person) => {
  return axios.post(API_URL, person).then((response) => response.data);
};

const getAllPersons = () => {
  return axios.get(API_URL).then((response) => response.data);
};

// Atualizar pessoa
const updatePerson = (person) => {
    return axios.put(API_URL, person).then((response) => response.data);
  };
  
  // Excluir pessoa
  const deletePerson = (id) => {
    return axios.delete(`${API_URL}/${id}`).then((response) => response.data);
  };

export default {
  createPerson,
  getAllPersons,
  updatePerson,
  deletePerson,
};
