const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
  // Listar todos os registros
    const { orderBy } = request.query;
    const direction = orderBy === 'DESC' ? 'DESC' : 'ASC';
    const contacts = await ContactsRepository.findAll(direction);

    response.json(contacts);
  }

  async show(request, response) {
  // Obter um Registro
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ erro: 'Not found' });
    }

    return response.json(contact);
  }

  async store(request, response) {
    // Criar um novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const emailExist = await ContactsRepository.findByEmail(email);

    if (emailExist) {
      return response.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    const contact = await ContactsRepository.addContact({
      name, email, phone, category_id,
    });
    response.status(201).json(contact);
  }

  async update(request, response) {
    // Atualizar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (!name) {
      return response.status(404).json({ erro: 'Nome é obrigatório' });
    }

    const emailExist = await ContactsRepository.findByEmail(email);

    if (emailExist && emailExist.id !== id) {
      return response.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Apagar um registro
    const { id } = request.params;
    // const contact = await ContactsRepository.findById(id);

    // if (!contact) {
    //   return response.status(404).json({ erro: 'Not found' });
    // }

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
