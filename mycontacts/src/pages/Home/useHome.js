import {
  // eslint-disable-next-line no-unused-vars
  useEffect, useState, useMemo, useCallback, useTransition,
} from 'react';
import ContactsServices from '../../services/ContactsServices';
import toast from '../../services/utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderby, setorderby] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isPending, startTransition] = useTransition();

  // const filteredContacts = useMemo(() => contacts.filter((contact) => (
  //   contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  // )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsServices.listContacts(orderby);
      //   const contactsList = []; await ContactsServices.listContacts(orderby);

      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);

      setIsLoading(false);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderby]);

  useEffect(() => {
    loadContacts();

    // return () => console.log('clearup');
  }, [loadContacts]);

  const handleToggleorderby = useCallback(() => {
    setorderby(
      (prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'),
    );
  }, []);

  //   function handleToggleorderby() {
  //     const newOrder = orderby === 'ASC' ? 'DESC' : 'ASC';
  //     setorderby(newOrder);

  //     fetch(`http://localhost:3001/contacts?orderby=${newOrder}`)
  //       .then(async (response) => {
  //         const json = await response.json();
  //         setContacts(json);
  //       })
  //       .catch((error) => {
  //         console.log('erro', error);
  //       });
  //   }

  function handleChangeSearchTerm(event) {
    const { value } = event.target;

    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) => (
        contact.name.toLowerCase().includes(value.toLowerCase())
      )));
    });
  }

  function handleTryAgain() {
    loadContacts();
  }

  const handleDeleteContact = useCallback((contato) => {
    setContactBeingDeleted(contato);
    setIsDeleteModalVisible(true);
  }, []);

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
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
    isPending,
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
  };
}
