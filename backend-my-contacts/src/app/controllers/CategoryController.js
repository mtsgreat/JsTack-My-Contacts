const CategoryRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require("../utils/isValidUUID")

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(404).json({ erro: 'Nome é obrigatório' });
    }

    const category = await CategoryRepository.create({ name });

    response.status(201).json(category);
  }

  async delete(request, response) {
    // Apagar um registro
    const { id } = request.params;
    

    if(!isValidUUID(id)){
      return response.status(400).json({error: 'Invalid category id'})
    }

    await CategoryRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
