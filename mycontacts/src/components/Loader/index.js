import reactDOM from 'react-dom';
import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return reactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}
