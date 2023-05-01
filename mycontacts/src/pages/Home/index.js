/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,

} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import deleteted from '../../assets/images/icons/delete.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
// import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import ContactsServices from '../../services/ContactsServices';
import magifierQuestion from '../../assets/images/magnifier-question.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsServices.listContacts(orderBy);
      //   const contactsList = []; await ContactsServices.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);

      setIsLoading(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();

    // return () => console.log('clearup');
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'),
    );
  }

  //   function handleToggleOrderBy() {
  //     const newOrder = orderBy === 'ASC' ? 'DESC' : 'ASC';
  //     setOrderBy(newOrder);

  //     fetch(`http://localhost:3001/contacts?orderBy=${newOrder}`)
  //       .then(async (response) => {
  //         const json = await response.json();
  //         setContacts(json);
  //       })
  //       .catch((error) => {
  //         console.log('erro', error);
  //       });
  //   }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      {/* <Modal danger /> */}
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar contato..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
            // eslint-disable-next-line no-nested-ternary
            hasError
              ? 'flex-end'
              : (
                contacts.length > 0
                  ? 'space-between'
                  : 'center'
              )
            }
      >
        {(!hasError && contacts.length > 0) && (
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="info">
            <strong>Ocorreu um erro ao obter os seus contatos</strong>

            <Button onClick={handleTryAgain} type="button">
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>

          {(contacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptyBox} alt="Sem contados" />
            <p>
              Você ainda não tem nenhum contato cadastrado!
              Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magifierQuestion} alt="Maginifier Question" />
              <span>
                Nenhum resultado foi encontrado para  <strong>`{searchTerm}`</strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleToggleOrderBy}>
              <span>Nome</span>
              <img src={arrow} alt="Arrow" />
            </button>
          </ListHeader>
          )}

          {filteredContacts.map((contato) => (
            <Card key={contato.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contato.name}</strong>
                  {contato.category_name
                                        && (<small>{contato.category_name}</small>
                                        )}
                </div>
                <span>{contato.email}</span>
                <span>{contato.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contato.id}`} alt="Edita">
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button">
                  <img src={deleteted} alt="delete" />
                </button>
              </div>
            </Card>
          ))}
        </>

      )}
    </Container>

  );
}
