export function getSingleProduct() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const url = `http://localhost:8000/api/products/${id}`;

  getSingleID(url);

  async function getSingleID(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        display(json);
        return json;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Display product
function display(product) {
  const container = document.querySelector("#productContainer");
  container.innerHTML = "";

  const id = product._id;
  const name = product.name;
  const qnt = product.quantity;
  const price = product.price;
  const image = product.image;

  const productCard = productTemplate(id, name, qnt, price, image);
  container.append(productCard);
}

function productTemplate(id, name, qnt, price, image) {
  const productCard = document.createElement("div");
  productCard.className = "productCard";
  productCard.innerHTML += `
                                <h1 id="productTitle"></h1>
                                <img src="${image}" class="image"/>
                                <div class="flexRow">
                                  <p>Quantity:</p>
                                  <p id="productQnt"></p>
                                </div>  
                                <div class="flexRow">
                                  <p>Price:</p>
                                  <p id="productPrice"></p>
                                </div>
                      `;

  productCard.querySelector("#productTitle").innerText = name;
  productCard.querySelector("#productQnt").innerText = qnt;
  productCard.querySelector("#productPrice").innerText = price;

  return productCard;
}
