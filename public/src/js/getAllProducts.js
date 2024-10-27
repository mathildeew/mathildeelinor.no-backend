export async function getAllProducts(url) {
  const response = await fetch(url);
  const json = await response.json();

  try {
    display(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

// Display products
function display(products) {
  const container = document.querySelector("#productsContainer");

  products.forEach((product) => {
    const id = product._id;
    const name = product.name;
    const qnt = product.quantity;
    const price = product.price;
    const image = product.image;

    const productCard = productTemplate(id, name, qnt, price, image);
    container.append(productCard);
  });
}

function productTemplate(id, name, qnt, price, image) {
  const productCard = document.createElement("a");
  productCard.className = "productCard";
  productCard.href = `/products/?id=${id}`;
  productCard.innerHTML += `
                                <h2 id="productTitle"></h2>
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
