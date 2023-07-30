import {
  Container,
} from './styles';

// import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import ErrorStatus from './components/ErrorStatus';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ContactList from './components/ContactsList';

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
        <ErrorStatus onTryAgain={handleTryAgain} />
      )}

      {!hasError && (
        <>

          {(contacts.length < 1 && !isLoading) && (
          <EmptyList />
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

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
