const ContactsRepository = require('../repositories/ContactsRepository');
const isValidUUID = require("../utils/isValidUUID")

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

    if(!isValidUUID(id)){
       return response.status(400).json({error: 'Invalid user id'})
    }

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

    if( category_id && !isValidUUID(category_id)){
      return response.status(400).json({error: 'Invalid category id'})
   }

    if(email) {
      const emailExist = await ContactsRepository.findByEmail(email);

    if (emailExist) {
      return response.status(400).json({ erro: 'E-mail já cadastrado' });
     }
    }

    const contact = await ContactsRepository.addContact({
      name, 
      email: email || null, 
      phone, 
      category_id: category_id || null
    });
    response.status(201).json(contact);
  }

  async update(request, response) {
    // Atualizar um registro
    const { id } = request.params;

    const {
      name, email, phone, category_id,
    } = request.body;

    if(!isValidUUID(id)){
      return response.status(400).json({error: 'Invalid contact id'})
   }

   if( category_id && !isValidUUID(category_id)){
    return response.status(400).json({error: 'Invalid contact id'})
   }

   if (!name) {
    return response.status(404).json({ erro: 'Nome é obrigatório' });
  }


    const contactExists = await ContactsRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Usuário não encontrado' });
    }

    if(email){
      const emailExist = await ContactsRepository.findByEmail(email);
      if (emailExist && emailExist.id !== id) {
        return response.status(400).json({ erro: 'E-mail já cadastrado' });
      }

    }

    const contact = await ContactsRepository.update(id, {
      name, 
      email: email || null, 
      phone, 
      category_id: category_id || null
    });

    response.json(contact);
  }

  async delete(request, response) {
    // Apagar um registro
    const { id } = request.params;
    // const contact = await ContactsRepository.findById(id);

    if(!isValidUUID(id)){
      return response.status(400).json({error: 'Invalid contact id'})
    }


    // if (!contact) {
    //   return response.status(404).json({ erro: 'Not found' });
    // }

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
