const sequelize = require('../database/models');
const Category = sequelize.models.Category;

async function getCategories() {
    try {
        const categories = await Category.findAll({raw: true });
        return categories;
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
}

async function createCategory(categoryName) {
  try {
      // Check if the category already exists, if it exists return it 
      const existingCategory = await Category.findOne({
          where: { name: categoryName }
      });

      if (existingCategory) {
          return existingCategory.id; 
      }

      // If category doesn't exist, create a new category
      const newCategory = await Category.create({ name: categoryName });
      console.log(`newCategory => ${newCategory}, => :: ${newCategory.id}`);
      return newCategory.id;
  } catch (error) {
      console.error('Error creating category:', error);
      throw error;
  }
}
module.exports = { getCategories, createCategory };