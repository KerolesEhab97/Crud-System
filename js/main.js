var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImg = document.getElementById("productImg");
var rowData = document.getElementById("rowData");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var productList = [];
var updatedIndex;

if (localStorage.getItem("productsArray") !== null) {
  productList = JSON.parse(localStorage.getItem("productsArray"));
  displayProduct(productList);
} else {
  productList = [];
}

function addProduct() {
  var alertMessage = document.getElementById("alertMessage");
  if (
    // nameValidation() &&
    // priceValidation() &&
    // categoryValidation() &&
    // descriptionValidation() &&
    // imageValidation() == true
    inputsValidations(productName, "nameErrorMsg") &&
    inputsValidations(productPrice, "priceErrorMsg") &&
    inputsValidations(productCategory, "categoryErrorMsg") &&
    inputsValidations(productDescription, "descriptionErrorMsg") &&
    inputsValidations(productImg, "imageErrorMsg") == true
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      image: `./Images/${productImg.files[0].name}`,
    };
    productList.push(product);
    console.log(productList);
    clearInputs();
    localStorage.setItem("productsArray", JSON.stringify(productList));
    alertMessage.classList.add("d-none");
    displayProduct(productList);
  } else {
    alertMessage.classList.remove("d-none");
  }
}

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
  productImg.value = "";

  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDescription.classList.remove("is-valid");
  productImg.classList.remove("is-valid");
}

function displayProduct(productsArray) {
  var cartona = "";
  for (let i = 0; i < productsArray.length; i++) {
    cartona += `<div class="col-md-3">
    <div class="card p-3">
      <img src="${productsArray[i].image}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h4>${productsArray[i].name}</h4>
        <p class="text-muted">${productsArray[i].description}</p>
        <h6>${productsArray[i].category}</h6>
        <h6>${productsArray[i].price}</h6>
        <div>
          <button onclick="deleteProduct(${i})" class="btn btn-danger w-100 my-2">Delete <i class="fa-solid fa-trash-can"></i></button>
          <button onclick="getProductToUbdate(${i})" class="btn btn-warning w-100">Update <i class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </div>
    </div>
  </div>`;
  }
  rowData.innerHTML = cartona;
}

function deleteProduct(productIndex) {
  productList.splice(productIndex, 1);
  displayProduct(productList);
  localStorage.setItem("productsArray", JSON.stringify(productList));
}

function getProductToUbdate(index) {
  updatedIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].description;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}
function updateProduct() {
  if (
    inputsValidations(productName, "nameErrorMsg") &&
    inputsValidations(productPrice, "priceErrorMsg") &&
    inputsValidations(productCategory, "categoryErrorMsg") &&
    inputsValidations(productDescription, "descriptionErrorMsg") == true
  ) {
    productList[updatedIndex].name = productName.value;
    productList[updatedIndex].price = productPrice.value;
    productList[updatedIndex].category = productCategory.value;
    productList[updatedIndex].description = productDescription.value;

    localStorage.setItem("productsArray", JSON.stringify(productList));
    displayProduct(productList);
    clearInputs();
    alertMessage.classList.add("d-none");
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  } else {
    alertMessage.classList.remove("d-none");
  }
}

function searchProduct() {
  console.log(searchInput.value);
  var searchArray = [];
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase()) == true
    ) {
      searchArray.push(productList[i]);
    }
  }
  displayProduct(searchArray);
}

// ! ******************* Advanced Validations Inputs *******************
function inputsValidations(element, msgId) {
  var rejex = {
    productName: /^[A-Z][A-Za-z0-9 _]{4,15}$/,
    productPrice: /^([1-9][0-9]{4}|100000)$/,
    productCategory: /^(Mobile|Tv|Laptop|Camera)$/i,
    productDescription: /^[A-Za-z| ]{5,}$/m,
    productImg: /^.+\.(jpg|svg|png|jpeg|webp)$/,
  };
  var text = element.value;
  var message = document.getElementById(msgId);

  if (rejex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    message.classList.add("d-none");
    message.classList.remove("d-block");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    message.classList.add("d-block");
    message.classList.remove("d-none");
    return false;
  }
}

// ! ******************* One Validation Function for every Input *******************
// function nameValidation() {
//   var rejex = /^[A-Z][A-Za-z0-9 _]{4,15}$/;
//   var text = productName.value;
//   var message = document.getElementById("nameErrorMsg");

//   if (rejex.test(text)) {
//     productName.classList.add("is-valid");
//     productName.classList.remove("is-invalid");
//     message.classList.add("d-none");
//     message.classList.remove("d-block");
//     return true;
//   } else {
//     productName.classList.add("is-invalid");
//     productName.classList.remove("is-valid");
//     message.classList.add("d-block");
//     message.classList.remove("d-none");
//     return false;
//   }
// }
// function priceValidation() {
//   var rejex = /^([1-9][0-9]{4}|100000)$/;
//   var text = productPrice.value;
//   var message = document.getElementById("priceErrorMsg");

//   if (rejex.test(text)) {
//     productPrice.classList.add("is-valid");
//     productPrice.classList.remove("is-invalid");
//     message.classList.add("d-none");
//     message.classList.remove("d-block");
//     return true;
//   } else {
//     productPrice.classList.add("is-invalid");
//     productPrice.classList.remove("is-valid");
//     message.classList.add("d-block");
//     message.classList.remove("d-none");
//     return false;
//   }
// }
// function categoryValidation() {
//   var rejex = /^(Mobile|Tv|Laptop|Camera)$/i;
//   var text = productCategory.value;
//   var message = document.getElementById("categoryErrorMsg");

//   if (rejex.test(text)) {
//     productCategory.classList.add("is-valid");
//     productCategory.classList.remove("is-invalid");
//     message.classList.add("d-none");
//     message.classList.remove("d-block");
//     return true;
//   } else {
//     productCategory.classList.add("is-invalid");
//     productCategory.classList.remove("is-valid");
//     message.classList.add("d-block");
//     message.classList.remove("d-none");
//     return false;
//   }
// }
// function descriptionValidation() {
//   var rejex = /^[A-Za-z| ]{5,}$/m;
//   var text = productDescription.value;
//   var message = document.getElementById("descriptionErrorMsg");

//   if (rejex.test(text)) {
//     productDescription.classList.add("is-valid");
//     productDescription.classList.remove("is-invalid");
//     message.classList.add("d-none");
//     message.classList.remove("d-block");
//     return true;
//   } else {
//     productDescription.classList.add("is-invalid");
//     productDescription.classList.remove("is-valid");
//     message.classList.add("d-block");
//     message.classList.remove("d-none");
//     return false;
//   }
// }
// function imageValidation() {
//   var rejex = /^.+\.(jpg|svg|png|jpeg|webp)$/;
//   var text = productImg.value;
//   var message = document.getElementById("imageErrorMsg");

//   if (rejex.test(text)) {
//     productImg.classList.add("is-valid");
//     productImg.classList.remove("is-invalid");
//     message.classList.add("d-none");
//     message.classList.remove("d-block");
//     return true;
//   } else {
//     productImg.classList.add("is-invalid");
//     productImg.classList.remove("is-valid");
//     message.classList.add("d-block");
//     message.classList.remove("d-none");
//     return false;
//   }
// }
