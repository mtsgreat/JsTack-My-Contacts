import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState, useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsServices from '../../services/ContactsServices';
import Loader from '../../components/Loader';
import toast from '../../services/utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsServices.getContactById(id);
        // console.log(contact);

        contactFormRef.current.setFieldsValues(contact);

        setIsLoading(false);
        setContactName(contact.name);
      } catch (error) {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado',
        });
      }
    }

    loadContact();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
