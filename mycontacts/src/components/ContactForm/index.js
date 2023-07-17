import {
  useState, useEffect, forwardRef, useImperativeHandle,
} from 'react';
import FormGroup from '../FormGroup';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';
import useErros from '../../hooks/useErros';
import CategoriesService from '../../services/CategoriesService';
import { Form, ButtonContainer } from './style';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
//   console.log('ref', ref);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const {
    erros,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErros();

  const isFormValid = (name && erros.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (contact) => {
      setName(contact.name ?? '');
      setEmail(contact.email ?? '');
      setPhone(formatPhone(contact.phone ?? ''));
      setCategoryId(contact.category_id ?? '');
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), []);

  //   useEffect(() => {
  //     const refObject = ref;
  //     refObject.current = {
  // setFieldsValues: (contact) => {
  //   setName(contact.name);
  //   setEmail(contact.email);
  //   setPhone(contact.phone);
  //   setCategoryId(contact.category_id);
  // },
  //     };
  //   }, []);

  useEffect(() => {
    async function loaderCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
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

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmiting(true);

    await onSubmit({
      name, email, phone, categoryId,
    });

    setIsSubmiting(false);
    // setName('');
    // setEmail('');
    // setPhone('');
    // setCategoryId('');
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          value={name}
          placeholder="Nome *"
          onChange={handleNameChange}
          disabled={isSubmiting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          value={email}
          placeholder="E-email"
          onChange={handleEmailChange}
          disabled={isSubmiting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={phone}
          placeholder="Telefone"
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmiting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmiting}
        >
          <option value="">Sem Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmiting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
});

export default ContactForm;
