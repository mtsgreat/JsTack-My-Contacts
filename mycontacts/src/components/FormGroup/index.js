import Spinner from '../Spinner';
import { Container } from './style';

export default function FormGroup({ children, error = null, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && (
        <div className="loader">
          <Spinner size={16} />
        </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}
