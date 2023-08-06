import { Overlay, Container, Footer } from './styles';
// eslint-disable-next-line import/order

import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimetedUnmount from '../../hooks/useAnimetedUnmount';

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
  const { shouldRender, animatedElementRef } = useAnimetedUnmount(visible);

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
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
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
