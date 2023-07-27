class CategoryMapper {
  toPersistence(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }

  toDomain(domainCategory) {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    };
  }
}

export default new CategoryMapper();
