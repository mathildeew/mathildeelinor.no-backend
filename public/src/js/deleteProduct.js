import { fetchOptions } from "./fetchOptions.js";

export function deleteProduct(id) {
  const form = document.getElementById("deleteProductForm");
  const formBtn = document.getElementById("deleteBtn");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    formBtn.innerText = "Deleting...";

    const response = await remove(`/api/products/${id}`);

    if (!response.ok) {
      window.location.replace("/");
    }
  });
}

async function remove(url) {
  const [getData, postData, putData, deleteData] = fetchOptions;
  const response = await fetch(url, deleteData);
  const json = await response.json();

  console.log(json);

  if (response.ok === true) {
    // window.location.href = `/products/?id=${json.id}`;
    // window.location.reload();
  }
  return json;
}
