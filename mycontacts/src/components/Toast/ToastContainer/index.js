import { useEffect, useState, useCallback } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../services/utils/toast';

export default function ToastContainer() {
  const [message, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), type, text, duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    const filteredMessage = message.filter((messageToast) => messageToast.id !== id);
    setMessages(filteredMessage);
  }, []);

  return (
    <Container>
      {message.map(({
        id, type, text, duration,
      }) => (
        <ToastMessage
          key={id}
          id={id}
          type={type}
          text={text}
          duration={duration}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
