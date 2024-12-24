import { cartModel } from "../models/cart.model.js";
import mongoose from "mongoose";

class CartDao {
  async getAll() {
    return await cartModel.find();
  }

  async getById(id) {
    return await cartModel.findById(id);
  }

  async create(data) {
    return await cartModel.create(data);
  }

  async update(id, data) {
    return await cartModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await cartModel.findByIdAndDelete(id);
  }

  async deleteProductInCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error(`Cart with id ${cid} not found`);
  
    // Filtrar los productos poblados por su _id
    const productFilter = cart.products.filter(
      (product) => product.product._id.toString() !== pid
    );
  
    // Actualizar el carrito con los productos filtrados
    return await cartModel.findByIdAndUpdate(
      cid,
      { products: productFilter },
      { new: true }
    );
  }

  async updateProductInCart(cid, pid, quantity) {
    const cart = await cartModel.findById(cid);
    if (!cart) throw new Error(`Cart with id ${cid} not found`);
  
    // Encuentra el producto en el carrito comparando los IDs
    const product = cart.products.find(product => product.product._id.toString() === pid);
    if (!product) throw new Error(`Product with id ${pid} not found in cart`);
  
    // Actualiza la cantidad
    product.quantity = quantity;
  
    // Guarda los cambios en el carrito
    return await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
  }

  async deleteProductsInCart(cid){
    return await cartModel.findByIdAndUpdate(cid, { products: [] }, { new: true });
  }
}

export const cartDao = new CartDao();