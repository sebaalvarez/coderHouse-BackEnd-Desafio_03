import express from "express";
import ProductManager from "./controller/productManager.js";

const app = express();
const PORT = 8080;
const pm = new ProductManager("./file");

app.use(express.urlencoded({ extended: true }));

// endpoints
app.get("/products", async (req, res) => {
  let products = await pm.getProducts();
  let limit = req.query.limit;

  res.send({ products: !limit ? products : products.slice(0, limit) });
});

app.get("/products/:pid", async (req, res) => {
  res.send({
    product: await pm.getProductById(Number.parseInt(req.params.pid)),
  });
});

// lanzar server
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
