import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Container } from './styles';

export default function Header({ hasError, contacts, filteredContacts }) {
  // eslint-disable-next-line no-nested-ternary
  const aligment = hasError
    ? 'space-around'
    : (
      contacts.length > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container justifycontent={aligment}>
      {(!hasError && contacts.length > 0) && (
      <strong>
        {filteredContacts.length}
        {filteredContacts.length === 1 ? ' contato' : ' contatos'}
      </strong>
      )}
      <Link to="/new">Novo contato</Link>
      <Link to="/new-category">Nova Categoria</Link>
    </Container>
  );
}
