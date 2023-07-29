import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../services/utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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

  function handleDeleteContact(contato) {
    setContactBeingDeleted(contato);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    // console.log('handleConfirmDeleteContact', contactBeingDeleted.id);

    try {
      setIsLoadingDelete(true);
      await ContactsServices.deleteContact(contactBeingDeleted.id);

      toast({
        type: 'sucess',
        text: 'Contato deletetado com sucesso!',
      });

      handleCloseDeleteModal();

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  return {
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
  };
}
