import { Container } from './style';

export default function FormGroup({ children, error = null }) {
  return (
    <Container>
      {children}
      {error && <small>{error}</small>}
    </Container>
  );
}
