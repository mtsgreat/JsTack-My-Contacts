import { useEffect } from 'react';
import { Container } from './styles';
import ToastMessage from '../ToastMessage';
import { toastEventManager } from '../../../services/utils/toast';
import useAnimetedList from '../../../hooks/useAnimetedList';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItems,
    handleAnimationEnd,
    renderList,
  } = useAnimetedList();

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
  }, [setMessages]);

  return (
    <Container>
      {renderList(({
        id, type, text, duration,
      }, { isLeaving }) => (
        <ToastMessage
          key={id}
          id={id}
          type={type}
          text={text}
          duration={duration}
          onRemoveMessage={handleRemoveItems}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
