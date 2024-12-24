import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: { type: Number, required: true },
    },
  ],
});

cartSchema.pre("findOne", function () {
  // Configuramos que relalice el populate solo cuando hace el find
  // La palabra this haces referencia a este documento, es por eso que la apalabra populate aparece y funciona
  this.populate("products.product");
});
export const cartModel = mongoose.model(cartsCollection, cartSchema);