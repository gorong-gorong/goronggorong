import { Product } from '../schemas/index.js';

const ProductModel = {
  create: async (productInfo) => {
    const newProduct = await Product.create(productInfo);
    return newProduct;
  },

  findAll: async () => {
    const allProducts = await Product.find({});
    return allProducts;
  },

  findByCategory: async (category) => {
    const foundProduct = await Product.find({ category });
    return foundProduct;
  },

  findById: async (id) => {
    const foundProduct = await Product.findOne({ id });
    return foundProduct;
  },

  findByName: async (name) => {
    const foundProduct = await Product.findOne({ name });
    return foundProduct;
  },

  update: async (id, update) => {
    const updatedProduct = await Product.findOneAndUpdate({ id: id }, update, { new: true });
    return updatedProduct;
  },

  delete: async (id) => {
    const deletedProduct = await Product.findOneAndDelete({ id: id }, { returnOriginal: false });
    return deletedProduct;
  },
};

export default ProductModel;
