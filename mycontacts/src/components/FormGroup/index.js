import { Container } from './style';

export default function FormGroup({ children, error = null, isLoading }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && <div className="loader" />}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}
