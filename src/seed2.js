import mongoose from "mongoose";
import { productModel } from "./dao/models/product.model.js";
import { cartModel } from "./dao/models/cart.model.js";

// URL de conexión a tu base de datos MongoDB
const mongoURI = "mongodb+srv://gianlucalarraya:zoAXp6OOSedB6yK1@clustercoder.uito7.mongodb.net/";

const seedData = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");

    // Crear 12 productos nuevos
    const productosNuevos = [
      { title: "Leche Entera", description: "1 litro de leche entera pasteurizada", price: 1.5, thumbnail: "url_imagen_leche", code: "LE001", stock: 50, category: "Lácteos" },
      { title: "Pan Integral", description: "Paquete de pan integral, 500g", price: 2.0, thumbnail: "url_imagen_pan", code: "PA002", stock: 30, category: "Panadería" },
      { title: "Manzanas", description: "1 kg de manzanas frescas", price: 3.0, thumbnail: "url_imagen_manzanas", code: "MA003", stock: 20, category: "Frutas" },
      { title: "Pasta Spaghetti", description: "Paquete de 500g de pasta tipo spaghetti", price: 1.2, thumbnail: "url_imagen_pasta", code: "PA004", stock: 40, category: "Alimentos Secos" },
      { title: "Huevos", description: "Docena de huevos frescos", price: 2.5, thumbnail: "url_imagen_huevos", code: "HU005", stock: 60, category: "Huevos" },
      { title: "Azúcar", description: "Bolsa de azúcar blanca refinada, 1kg", price: 1.0, thumbnail: "url_imagen_azucar", code: "AZ006", stock: 25, category: "Alimentos Básicos" },
      { title: "Arroz", description: "Bolsa de arroz blanco, 1kg", price: 1.3, thumbnail: "url_imagen_arroz", code: "AR007", stock: 35, category: "Alimentos Básicos" },
      { title: "Aceite Vegetal", description: "Botella de 1 litro de aceite vegetal", price: 3.5, thumbnail: "url_imagen_aceite", code: "AC008", stock: 15, category: "Aceites" },
      { title: "Queso Rallado", description: "Bolsa de queso rallado, 200g", price: 4.0, thumbnail: "url_imagen_queso", code: "QR009", stock: 20, category: "Lácteos" },
      { title: "Cereal", description: "Caja de cereal integral, 500g", price: 3.8, thumbnail: "url_imagen_cereal", code: "CE010", stock: 40, category: "Desayunos" },
      { title: "Tomates", description: "1 kg de tomates frescos", price: 2.2, thumbnail: "url_imagen_tomates", code: "TO011", stock: 30, category: "Verduras" },
      { title: "Jugo de Naranja", description: "Botella de 1 litro de jugo de naranja natural", price: 2.8, thumbnail: "url_imagen_jugo", code: "JN012", stock: 25, category: "Bebidas" },
    ];

    await productModel.insertMany(productosNuevos);
    console.log("Productos creados:", productosNuevos);

    // Obtener los productos recién creados
    const products = await productModel.find();

    // Crear dos carritos con 12 productos cada uno
    const carritos = [];
    for (let i = 0; i < 2; i++) {
      const carritoProductos = products.slice(0, 12).map((product) => ({
        product: product._id,
        quantity: Math.floor(Math.random() * 10) + 1, // Cantidad aleatoria entre 1 y 10
      }));

      const carrito = await cartModel.create({
        products: carritoProductos,
      });
      carritos.push(carrito);
    }

    console.log("Carritos creados:", carritos);

    // Desconectar de MongoDB
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};

seedData();

