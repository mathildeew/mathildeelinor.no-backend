import { fetchOptions } from "./fetchOptions.js";

export function updateProduct(id) {
  const form = document.getElementById("updateForm");
  const formBtn = document.getElementById("formBtn");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("newProductName");
    const qnt = document.getElementById("newProductQnt");
    const price = document.getElementById("newProductPrice");

    const productContent = {
      name: name.value,
      quantity: parseInt(qnt.value),
      price: parseFloat(price.value),
    };

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
