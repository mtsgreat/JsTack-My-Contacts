import { useState } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [message] = useState([
    { id: Math.random(), type: 'default', text: 'Default text' },
    { id: Math.random(), type: 'danger', text: 'Danger text' },
    { id: Math.random(), type: 'sucess', text: 'Sucess text' },
  ]);
  return (
    <Container>
      {message.map(({ id, type, text }) => (
        <ToastMessage
          key={id}
          type={type}
          text={text}
        />
      ))}
    </Container>
  );
}
