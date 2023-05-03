import { useState, useEffect } from 'react';
import FormGroup from '../FormGroup';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErros from '../../hooks/useErros';
import CategoriesService from '../../services/CategoriesService';
import { Form, ButtonContainer } from './style';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const {
    erros,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErros();

  const isFormValid = (name && erros.length === 0);

  useEffect(() => {
    async function loaderCategories() {
      const categoriesList = await CategoriesService.listCategories();

      //   console.log(categoriesList);
      setCategories(categoriesList);
    }

    loaderCategories();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      name, email, phone, categoryId,
    });
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          value={name}
          placeholder="Nome *"
          onChange={handleNameChange}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          value={email}
          placeholder="E-email"
          onChange={handleEmailChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={phone}
          placeholder="Telefone"
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
        >
          <option value="">Sem Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
}
