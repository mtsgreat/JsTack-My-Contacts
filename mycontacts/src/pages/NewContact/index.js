import { useRef } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsServices';
import toast from '../../services/utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'sucess',
        text: 'Contato cadastrado com Sucesso!',
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
        text: 'Erro ao cadastrar o contato!',
      });
    }
  }
  return (
    <>
      <PageHeader
        title="Novo Contato"
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
