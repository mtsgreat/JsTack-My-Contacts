import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Overlay, Container, Footer } from './styles';
// eslint-disable-next-line import/order

import Button from '../Button';
import ReactPortal from '../ReactPortal';

export default function Modal({
  danger = false,
  title,
  isLoading = false,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  visible,
}) {
  const [shouldRender, setShouldRender] = useState(visible);

  const overlayRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = overlayRef.current;
    if (!visible && overlayRefElement) {
      overlayRefElement.addEventListener('animationend', handleAnimationEnd);
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener('animationend', handleAnimationEnd);
      }
    };
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  //   let container = document.getElementById('modal-root');

  //   if (!container) {
  //     // cria elemento div
  //     container = document.createElement('div');
  //     // set a propiedade id e o name do is
  //     container.setAttribute('id', 'modal-root');
  //     // colocar a div criada no body
  //     document.body.appendChild(container);
  //   }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={overlayRef}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
