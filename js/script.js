let fristcontainer = document.querySelector("#fristcontainer");
let addButton = document.querySelector("#addbtn");
let productName = document.querySelector("#productname");
let productPrice = document.querySelector("#productprice");
let productaregory = document.querySelector("#productcatigory");
let productContainer = [];
let savebutton = document.querySelector("#savebtn");
let totalPriceDivBroser = document.querySelector("#total-price");
// Errror Div
let error = document.createElement("p");
error.className = "error";
error.textContent = "Please fill all fields!";
// Errror Div

// Price Div
let priceDiv = document.createElement("div");
priceDiv.className = "price-div";
function addPriceToDiv() {}
// Price Div
if (localStorage.getItem("products") !== null) {
  productContainer = JSON.parse(localStorage.getItem("products"));

  productContainer.forEach((product) => {
    displayProducts(product);
  });
}
function addProduct() {
  let products = {
    name: productName.value,
    price: parseFloat(productPrice.value),
    category: productaregory.value,
  };

  if (products.name && products.category && products.price) {
    productContainer.push(products);

    displayProducts(products);
    localStorage.setItem("products", JSON.stringify(productContainer));
    calcTotalPrice();
  } else {
    fristcontainer.appendChild(error);
  }
}

// clear function to make input clear
function clearProduct() {
  productName.value = "";
  productPrice.value = "";
  productaregory.value = "";
}
// clear function

// display table Function to broser

function displayProducts() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";
  productContainer.forEach((products, index) => {
    let tr = document.createElement("tr");

    let thName = document.createElement("td");
    thName.textContent = products.name;

    let thprice = document.createElement("td");
    thprice.textContent = products.price;

    let thCategory = document.createElement("td");
    thCategory.textContent = products.category;
    // Update button
    // let tdUpdate = document.createElement("td");
    // let updateBtn = document.createElement("button");
    // updateBtn.textContent = `Update`;
    // updateBtn.className = "btn btn-warning btn-sm d-block text-center m-auto";
    // Edite button
    let tdEdit = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.textContent = `Edite`;
    editBtn.className = "btn btn-info btn-sm d-block text-center m-auto";
    // delete button
    let tdDeleteBtn = document.createElement("td");
    deletBtn = document.createElement("button");
    deletBtn.textContent = `Delete`;
    deletBtn.className = "btn btn-danger btn-sm d-block text-center m-auto";
    // appen To Broser
    tr.appendChild(thName);
    tr.appendChild(thprice);
    tr.appendChild(thCategory);
    tr.appendChild(tdEdit);
    // tr.appendChild(tdUpdate);
    tr.appendChild(tdDeleteBtn);
    tdEdit.appendChild(editBtn);
    // tdUpdate.appendChild(updateBtn);
    tdDeleteBtn.appendChild(deletBtn);
    tbody.appendChild(tr);
    // edite
    editBtn.addEventListener("click", () => {
      editeProduct(index);
    });
    // edite
    // Delete input function from local and Broser
    deletBtn.addEventListener("click", () => {
      deletProduct();
    });
  });
}
// edite function

function editeProduct(index) {
  let prodct = productContainer[index];

  productName.value = prodct.name;
  productPrice.value = prodct.price;
  productaregory.value = prodct.category;
  addButton.textContent = "Edite Product";

  deletProduct();
}
// edite function
// Delet product fanction
function deletProduct(deletindex) {
  productContainer.splice(deletindex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts();
  calcTotalPrice();
}
// Delet product fanction

// calculat total price function
function calcTotalPrice() {
  let totalPrice = productContainer.reduce((sum, product) => {
    return sum + parseFloat(product.price);
  }, 0);
  let totalPticeDiv = document.createElement("div");
  totalPticeDiv.className = "total-price-div w-100";
  totalPticeDiv.textContent = `total price : ${totalPrice}`;
  totalPriceDivBroser.appendChild(totalPticeDiv);
}
// calculat total price function

// update price Product Function

// update price Product Function
addButton.addEventListener("click", addProduct);
addButton.addEventListener("click", clearProduct);
