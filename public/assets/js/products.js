const localStorageProducts = JSON.parse(localStorage.getItem("products"));

if (
  localStorage.getItem("logged") == null ||
  localStorage.getItem("logged") == "false"
) {
  alert("Please login, Session Expired!");
  window.location.assign("/login.html");
}

let productData = [];
let dataPane = document.getElementById("dataPane");
let countPlaceholder = document.getElementById("countPlaceholder");
let expiredFilter = document.getElementById("expired");
let lowStockFilter = document.getElementById("lowStock");
const logOut = document.getElementById("logOut");
let totalCount = 0;
let lowStockCount = 0;
let expiredCount = 0;
let lowStockEleRefs = [];
let expiredEleRefs = [];
let today = new Date();

const fetchProduct = async (url) => {
  if (localStorageProducts == undefined) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLocalStorageProducts(data);
        productData = data;
      })
      .catch((err) => console.log("Error cannot fetch data: ", err));
  } else setLocalStorageProducts(localStorageProducts);
};

const setLocalStorageProducts = (data) => {
  if (localStorageProducts == undefined) {
    localStorage.setItem("products", JSON.stringify(data));
    productData = data;
    loadData();
  } else {
    productData = data;
    loadData();
  }
};

function loadData() {
  totalCount = productData.length;
  countPlaceholder.innerText = totalCount;

  let df = new DocumentFragment();

  productData.forEach((item) => {
    let newEle = document.createElement("tr");
    newEle.innerHTML = ` 
    <td class="product_pane dark_text product_id">${item.id}</td>
    <td class="dark_text">${item.medicineName}</td>
    <td class="dark_text">${item.medicineBrand}</td>
    <td class="smoke_text expiry_date">${item.expiryDate}</td>
    <td class="smoke_text">$${item.unitPrice}</td>
    <td class="dark_text">${item.stock}</td>
   `;

    df.appendChild(newEle);

    if (item.stock < 100) {
      lowStockCount++;
      lowStockEleRefs.push(newEle);
    }
    let tmp = new Date(item.expiryDate);
    if (tmp < today) {
      expiredCount++;
      expiredEleRefs.push(newEle);
    }
  });

  dataPane.appendChild(df);
}

function expiredFilterHandler() {
  if (expiredFilter.checked) {
    totalCount += expiredCount;
    countPlaceholder.innerText = totalCount;
    expiredEleRefs.forEach((e) => {
      e.hidden = false;
    });
  } else {
    totalCount -= expiredCount;
    countPlaceholder.innerText = totalCount;
    expiredEleRefs.forEach((e) => {
      e.hidden = true;
    });
  }
}

function lowStockFilterHandler() {
  if (lowStockFilter.checked) {
    totalCount += lowStockCount;
    countPlaceholder.innerText = totalCount;
    lowStockEleRefs.forEach((e) => {
      e.hidden = false;
    });
  } else {
    totalCount -= lowStockCount;
    countPlaceholder.innerText = totalCount;
    lowStockEleRefs.forEach((e) => {
      e.hidden = true;
    });
  }
}

const logOutHandler = () => {
  localStorage.setItem("logged", false);
  window.location.assign("/login.html");
};

logOut.addEventListener("click", logOutHandler);
expiredFilter.addEventListener("change", expiredFilterHandler);
lowStockFilter.addEventListener("change", lowStockFilterHandler);

fetchProduct("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products");
