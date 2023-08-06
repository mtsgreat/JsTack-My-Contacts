import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCicleIcon from '../../../assets/images/icons/check-circle.svg';

import useAnimetedUnmount from '../../../hooks/useAnimetedUnmount';

export default function ToastMessage({
  id,
  text,
  type = 'default',
  onRemoveMessage,
  duration,
  isLeaving,
}) {
  const { shouldRender, animatedElementRef } = useAnimetedUnmount(!isLeaving);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(id);
    }, duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, onRemoveMessage, duration]);

  function handleRemoveToast() {
    // console.log('handleRemoveToast');
    onRemoveMessage(id);
  }

  if (!shouldRender) {
    return null;
  }
  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      rule="button"
      isLeaving={isLeaving}
      ref={animatedElementRef}
    >
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'sucess' && <img src={checkCicleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}
