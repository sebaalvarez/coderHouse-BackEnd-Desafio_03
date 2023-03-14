import express from "express";
import ProductManager from "./controller/productManager.js";

const app = express();
const PORT = 8080;
const path = "./file";

app.use(express.urlencoded({ extended: true }));

// endpoints
app.get("/products", async (req, res) => {
  let products = await new ProductManager(path).getProducts();
  let limit = req.query.limit;

  if (!limit) return res.send({ products });
  res.send({ products: products.slice(0, limit) });
});

app.get("/products/:pid", async (req, res) => {
  res.send({
    product: await new ProductManager(path).getProductById(
      Number.parseInt(req.params.pid)
    ),
  });
});

// lanzar server
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
