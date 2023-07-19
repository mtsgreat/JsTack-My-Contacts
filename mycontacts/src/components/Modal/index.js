import { Overlay, Container, Footer } from './styles';
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom';
import Button from '../Button';

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
  if (!visible) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
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
    </Overlay>,
    document.getElementById('modal-root'),

  );
}
