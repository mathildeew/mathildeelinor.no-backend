import { fetchOptions } from "./fetchOptions.js";

export function updateProduct(id) {
  const form = document.getElementById("updateForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("newProductName");
    const qnt = document.getElementById("newProductQnt");
    const price = document.getElementById("newProductPrice");
    const image = document.getElementById("newProductImage");

    const productContent = {};
    if (name.value) {
      productContent.name = name.value;
    }
    if (qnt.value) {
      productContent.quantity = parseInt(qnt.value);
    }
    if (price.value) {
      productContent.price = parseFloat(price.value);
    }
    if (image.value) {
      productContent.image = image.value;
    }

    const response = await update(`/api/products/${id}`, productContent);

    if (!response.ok) {
      const errorMessage = document.createElement("p");
      errorMessage.innerHTML = `${response.message}`;
      form.append(errorMessage);
      form.querySelector("button").innerText = "Update product";
    }
  });

  async function update(url, productContent) {
    const [getData, postData, putData] = fetchOptions;
    putData["body"] = JSON.stringify(productContent);
    const response = await fetch(url, putData);
    const json = await response.json();

    if (response.ok === true) {
      window.location.reload();
    }
    return json;
  }
}
