import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState, useRef } from 'react';

import ContactsServices from '../../services/ContactsServices';

import toast from '../../services/utils/toast';
import useIsMounted from '../../hooks/useIsMounted';

export default function useEditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsServices.getContactById(id);

        if (isMounted()) {
          contactFormRef.current.setFieldsValues(contact);

          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch (error) {
        if (isMounted()) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contato não encontrado',
          });
        }
      }
    }

    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsServices.updateContact(id, contact);

      setContactName(contactData.name);

      toast({
        type: 'sucess',
        text: 'Contato editado com Sucesso!',
      });
    } catch {
      //   const event = new CustomEvent('addtoast', {
      //     detail: {
      //       type: 'danger',
      //       text: 'Erro ao cadastrar o contato!',
      //     },
      //   });

      //     document.dispatchEvent(event);

      toast({
        type: 'danger',
        text: 'Erro ao editar o contato!',
      });
    }
  }

  return {
    isLoading,
    contactName,
    handleSubmit,
    contactFormRef,
  };
}
