import { createProductListener } from "./createProduct.js";
import { deleteProduct } from "./deleteProduct.js";
import { getAllProducts } from "./getAllProducts.js";
import { getSingleProduct } from "./getSingleProduct.js";
import { updateProduct } from "./updateProduct.js";

const url = "/api/products";

// Router - Run function based on pathname
const path = location.pathname;

switch (path) {
  case "/":
    getAllProducts(url);
    createProductListener();
    break;

  case "/products/":
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    if (id) {
      getSingleProduct(id);
      updateProduct(id);
      deleteProduct(id);
    } else {
      console.log("Route ID not found");
    }
    break;

  default:
    console.log("Route not found.");
}
