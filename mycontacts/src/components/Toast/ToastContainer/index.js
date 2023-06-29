import { useEffect, useState } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';

export default function ToastContainer() {
  const [message, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { type, text } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text },
      ]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => {
      document.removeEventListener(handleAddToast);
    };
  }, []);
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
