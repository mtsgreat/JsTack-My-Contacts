const CategoryRepository = require('../repositories/CategoriesRepository');

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
}

module.exports = new CategoryController();
