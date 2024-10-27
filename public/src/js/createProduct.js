import { fetchOptions } from "./fetchOptions.js";

// Create product listener
export function createProductListener() {
  const form = document.getElementById("productForm");
  const formBtn = document.getElementById("formBtn");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    formBtn.innerText = "Creating...";

    const name = document.getElementById("createProductName");
    const qnt = document.getElementById("createProductQnt");
    const price = document.getElementById("createProductPrice");
    const image = document.getElementById("createProductImage");

    const productContent = {
      name: name.value,
      quantity: parseFloat(qnt.value),
      price: parseFloat(price.value),
      image: image.value,
    };

    const response = await createProduct("/api/products/", productContent);

    if (!response.ok) {
      const errorMessage = document.createElement("p");
      errorMessage.innerHTML = `${response.error._message}`;
      form.append(errorMessage);
      formBtn.innerText = "Create product";
    }
  });
}

async function createProduct(url, productContent) {
  try {
    const [getData, postData] = fetchOptions;
    postData["body"] = JSON.stringify(productContent);
    const response = await fetch(url, postData);
    const json = await response.json();

    if (response.ok === true) {
      window.location.reload();
    }
    return json;
  } catch (error) {
    return error;
  }
}
