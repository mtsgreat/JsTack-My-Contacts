import { useState } from 'react';

export default function useErros() {
  const [erros, setErros] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExists = erros.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErros((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName) {
    setErros((prevState) => prevState.filter(
      (error) => error.field !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fieldName) {
    return erros.find((error) => error.field === fieldName)?.message;
  }

  return {
    erros,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
