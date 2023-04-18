import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('product', ProductSchema);

export class ProductModel {
    async create(productInfo) {
        const newProduct = await Product.create(productInfo);
        return newProduct;
    }
    async findById(id) {
        const foundProduct = await Product.findOne({id});
        return foundProduct;
    }
    async findByCategory(category) {
        const foundProduct = await Product.find({ category });
        return foundProduct;
    }
    async findByName(name) {
        const foundProduct = await Product.findOne({ name });
        return foundProduct;
    }
    async findAll() {
        const allProducts = await Product.find({});
        return allProducts;
    }
    async update({ _id, update }) {
        const updatedProduct = Product.findOneAndUpdate({ _id, returnOriginal: false }, update);
        return updatedProduct;
    }
    async delete(_id) {
        const deletedProduct = await Product.findOneAndDelete({ _id, returnOriginal: false });
        return deletedProduct;
        
    }
}

const productModel = new ProductModel();

export { productModel }
