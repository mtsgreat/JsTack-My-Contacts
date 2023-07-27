import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map((category) => CategoryMapper.toDomain(category));
  }

  creatCategory(categoryName) {
    const body = CategoryMapper.toPersistence(categoryName);

    return this.httpClient.post('/categories', { body });
  }
}

export default new CategoriesService();
