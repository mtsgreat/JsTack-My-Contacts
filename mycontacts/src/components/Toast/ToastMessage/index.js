import { useEffect, memo } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCicleIcon from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({
  id,
  text,
  type = 'default',
  onRemoveMessage,
  duration,
  isLeaving,
  animatedRef,
}) {
//   const animatedElementRef = useRef(null);

  //   useEffect(() => {
  //     function handleAnimationEnd() {
  //       onAnimationEnd(id);
  //     }

  //     const overlayRefElement = animatedElementRef.current;
  //     if (isLeaving) {
  //       overlayRefElement.addEventListener('animationend', handleAnimationEnd);
  //     }

  //     return () => {
  //       overlayRefElement.removeEventListener('animationend', handleAnimationEnd);
  //     };
  //   }, [id, isLeaving, onAnimationEnd]);

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

  return (
    <Container
      type={type}
      onClick={handleRemoveToast}
      tabIndex={0}
      rule="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {type === 'sucess' && <img src={checkCicleIcon} alt="Check" />}
      <strong>{text}</strong>
    </Container>
  );
}

export default memo(ToastMessage);
