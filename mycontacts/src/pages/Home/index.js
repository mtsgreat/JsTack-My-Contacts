/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import {
  Container,
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
import magifierQuestion from '../../assets/images/magnifier-question.svg';
import Modal from '../../components/Modal';
import useHome from './useHome';
import InputSearch from './components/InputSearch';
import Header from './components/Header';

export default function Home() {
  const {
    isLoading,
    hasError,
    isDeleteModalVisible,
    isLoadingDelete,
    filteredContacts,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleConfirmDeleteContact,
    contactBeingDeleted,
    handleCloseDeleteModal,
    contacts,
    searchTerm,
    orderBy,
  } = useHome();

  return (
    <Container>

      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        contacts={contacts}
        filteredContacts={filteredContacts}
      />

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
                  {contato.category.name
                                        && (<small>{contato.category.name}</small>
                                        )}
                </div>
                <span>{contato.email}</span>
                <span>{contato.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contato.id}`} alt="Edita">
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button" onClick={() => handleDeleteContact(contato)}>
                  <img src={deleteted} alt="delete" />
                </button>
              </div>
            </Card>
          ))}
          <Modal
            isLoading={isLoadingDelete}
            danger
            visible={isDeleteModalVisible}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >

            <p>Está ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>

  );
}
