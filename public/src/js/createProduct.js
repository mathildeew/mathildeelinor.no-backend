import { fetchOptions } from "./fetchOptions.js";

// Create product listener
export function createProductListener() {
  const form = document.getElementById("productForm");
  const formBtn = document.getElementById("formBtn");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    formBtn.innerText = "Creating...";

    const name = document.getElementById("createProductName");
    const qnt = document.getElementById("createProductQn");
    const price = document.getElementById("createProductPrice");

    const productContent = {
      name: name.value,
      quantity: parseFloat(qnt.value),
      price: parseFloat(price.value),
    };

    const response = await createProduct("/api/products/", productContent);
    console.log(response);

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

    // console.log(response);

    if (response.ok === true) {
      // window.location.href = `/products/?id=${json.id}`;
      // window.location.reload();
    }
    return json;
  } catch (error) {
    return error;
  }
}
