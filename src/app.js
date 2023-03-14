import express from "express";
import ProductManager from "./controller/productManager.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

let products = await new ProductManager("./file").getProducts();

app.get("/products", (req, res) => {
  let limit = req.query.limit;

  if (!limit) return res.send({ products });

  const userLimit = [];
  let i = 0;
  products.filter((p) => {
    if (i < limit) {
      userLimit.push(p);
      i++;
    }
  });

  res.send({ products: userLimit });
});

app.get("/products/:pid", (req, res) => {
  let pid = req.params.pid;
  let product = products.find((u) => u.id == pid);

  if (!product) return res.send(`Producto con Id: ${pid} no encontrado`);
  res.send({ product: product });
});

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
