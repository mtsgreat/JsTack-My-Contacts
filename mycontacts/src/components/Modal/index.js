import { Overlay, Container, Footer } from './styles';
// eslint-disable-next-line import/order
import ReactDOM from 'react-dom';
import Button from '../Button';

export default function Modal({ danger = false }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Titulo Modal</h1>
        <p>
          Corpo do modal
        </p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button type="button" danger={danger}>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),

  );
}
