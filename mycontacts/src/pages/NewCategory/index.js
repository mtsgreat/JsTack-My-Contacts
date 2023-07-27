import PageHeader from '../../components/PageHeader';

import toast from '../../services/utils/toast';
import CategoryForm from '../../components/CategoryForm';
import CategoriesService from '../../services/CategoriesService';

export default function NewContact() {
//   const contactFormRef = useRef(null);
  async function handleSubmit(category) {
    try {
      await CategoriesService.creatCategory(category);

      //   contactFormRef.current.resetFields();

      toast({
        type: 'sucess',
        text: 'Categoria cadastrada com Sucesso!',
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
        title="Nova Categoria"
      />
      <CategoryForm
        // ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
