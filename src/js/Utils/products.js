const getProductsLocal = JSON.parse(localStorage.getItem("products"));

export const fetchProducts = () => {
  if (getProductsLocal == undefined) {
    const fetchProductAPI = async (url) => {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data, "from server");
          setLocalStorage(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };
    fetchProductAPI(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"
    );
  } else {
    setLocalStorage(null);
  }
};

const setLocalStorage = (data) => {
  if (getProductsLocal == undefined) {
    localStorage.setItem("products", JSON.stringify(data));
    filterData(data);
    eventListners();
  } else {
    filterData(getProductsLocal);
    eventListners();
  }
};

const checkExpired = (date) => {
  return new Date(date) < new Date();
};

function filterData(data) {
  const productExpiry = document.getElementById("expired");
  const lowStock = document.getElementById("low-stock");
  const productBody = document.getElementById("productsTable");
  const orderCount = document.getElementById("product_count");

  productBody.innerHTML = "";
  orderCount.innerHTML = "";

  let count = 0;

  for (let i = 0; i < data.length; i++) {
    if (!productExpiry.checked && checkExpired(data[i].expiryDate)) {
      continue;
    } else if (!lowStock.checked && data[i].stock < 100) {
      continue;
    } else {
      count++;
      productBody.innerHTML += `<tr>
      <td>${data[i].id}</td>
      <td class="med_name">${data[i].medicineName}</td>
      <td class="med_brand">${data[i].medicineBrand}</td>
      <td>${data[i].expiryDate}</td>
      <td>${data[i].unitPrice}</td>
      <td>${data[i].stock}</td>
      </tr>`;
    }
  }
  orderCount.textContent = count;
}

function eventListners() {
  const productExpiry = document.getElementById("expired");
  const lowStock = document.getElementById("low-stock");
  productExpiry.addEventListener("click", function () {
    filterData(getProductsLocal);
  });
  lowStock.addEventListener("click", function () {
    filterData(getProductsLocal);
  });
}
