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
    // isPending,
    isLoading,
    hasError,
    isDeleteModalVisible,
    isLoadingDelete,
    filteredContacts,
    handleToggleorderby,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleConfirmDeleteContact,
    contactBeingDeleted,
    handleCloseDeleteModal,
    contacts,
    searchTerm,
    orderby,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (contacts.length < 1 && !isLoading);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>

      <Loader isLoading={isLoading} />

      {hasContacts && (
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

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {isListEmpty && <EmptyList />}

      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>

          <ContactList
            filteredContacts={filteredContacts}
            orderby={orderby}
            onToggleorderby={handleToggleorderby}
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
