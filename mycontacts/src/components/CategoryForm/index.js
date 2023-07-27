import {
  useState, forwardRef,
} from 'react';
import FormGroup from '../FormGroup';

import useErros from '../../hooks/useErros';

import { Form, ButtonContainer } from './style';
import Input from '../Input';

import Button from '../Button';

// eslint-disable-next-line no-unused-vars
const CategoryForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('');

  const [isSubmiting, setIsSubmiting] = useState(false);

  const {
    erros,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErros();

  const isFormValid = (name && erros.length === 0);

  function handleCategoryName(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmiting(true);
    await onSubmit({
      name,
    });

    setIsSubmiting(false);
    setName('');
    // setEmail('');
    // setPhone('');
    // setCategoryId('');
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('categoryName')}>
        <Input
          error={getErrorMessageByFieldName('categoryName')}
          value={name}
          placeholder="Nome *"
          onChange={handleCategoryName}
          disabled={isSubmiting}
        />
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

export default CategoryForm;
