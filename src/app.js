import express from "express";
import ProductManager from "./controller/productManager.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

// endpoints
app.get("/products", async (req, res) => {
  let products = await new ProductManager("./file").getProducts();
  let limit = req.query.limit;

  if (!limit) return res.send({ products });
  res.send({ products: products.slice(0, limit) });
});

app.get("/products/:pid", async (req, res) => {
  let products = await new ProductManager("./file").getProducts();
  let pid = req.params.pid;
  let product = products.find((u) => u.id == pid);

  if (!product) return res.send(`Producto con Id: ${pid} no encontrado`);
  res.send({ product: product });
});

// lanzar server
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
