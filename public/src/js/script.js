const url = process.env.REACT_APP_API_URL || "http://localhost:8000/api/products";

export async function getAll(url) {
  const response = await fetch(url);
  const json = await response.json();

  if (response.ok) {
    return json;
  } else {
    console.log(error);
  }
}

function display(products){
    const container = document.querySelector("#productsContainer")
    container.innerHTML = `
    
    `
}