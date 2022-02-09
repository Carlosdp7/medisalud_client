import React, { createContext, useState } from 'react';
import clienteAxios from '../axios/axios';
import Swal from 'sweetalert2';
import { navigate } from 'gatsby';

export const TestContext = createContext();

const TestProvider = ({ children }) => {
  const [tests, setTests] = useState([]);

  const handleErrors = (err) => {
    if (!err.response) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error de conexión',
        confirmButtonColor: '#0b5ed7'
      });
    }
    const errors = err.response.data;
    const msg = errors?.errors?.length ? errors.errors[0].msg : errors.err;

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msg,
      confirmButtonColor: '#0b5ed7'
    });
  }

  const handleSuccess = (text) => {
    Swal.fire({
      icon: 'success',
      title: 'Ok...',
      text: text,
      confirmButtonColor: '#0b5ed7'
    }).then(() => {
      navigate('/dashboard/inicio/')
    });
  }

  const obtainTests = async () => {
    try {
      const res = await clienteAxios.get('/test/obtain-tests');

      setTests(res.data);
    } catch (err) {
      handleErrors(err);
    }
  }

  const createTest = async (data) => {
    try {
      const res = await clienteAxios.post('/test/create-test', data);
      const newTests = [...tests];
      newTests.unshift(res.data.test);
      setTests(newTests)
      handleSuccess('Prueba creada correctamente');
    } catch (err) {
      handleErrors(err);
    }
  }

  const updateTest = async (testId, data) => {
    try {
      const res = await clienteAxios.put(`/test/update-test/${testId}`, data);
      const newTests = [...tests].map(test => {
        if (test._id === res.data.test._id) {
          return res.data.test
        }
        return test;
      });
      setTests(newTests)
      handleSuccess('Prueba editada correctamente');
    } catch (err) {
      handleErrors(err);
    }
  }

  const deleteTest = async (testId) => {
    try {
      await clienteAxios.delete(`/test/delete-test/${testId}`);
      const newTests = [...tests].filter(test => test._id !== testId);

      setTests(newTests)
      handleSuccess('Prueba eliminada correctamente');
    } catch (err) {
      handleErrors(err);
    }
  }

  return (
    <TestContext.Provider
      value={{
        tests,
        obtainTests,
        createTest,
        updateTest,
        deleteTest
      }}
    >
      {children}
    </TestContext.Provider>
  )
}

export default TestProvider;