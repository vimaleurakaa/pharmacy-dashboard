const localStorageOrders = JSON.parse(localStorage.getItem("orders"));

const logOut = document.getElementById("logOut");

if (
  localStorage.getItem("logged") == null ||
  localStorage.getItem("logged") == "false"
) {
  alert("Please login, Session Expired!");
  window.location.assign("/login.html");
}

let ordersList = [];

const fetchOrders = async (url) => {
  if (localStorageOrders == undefined) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLocalStorageOrders(data);
      })
      .catch((err) => console.log("Error cannot fetch data: ", err));
  } else setLocalStorageOrders(localStorageOrders);
};

const setLocalStorageOrders = (data) => {
  if (localStorageOrders == undefined) {
    localStorage.setItem("orders", JSON.stringify(data));
    renderOrdersData(data);
    ordersList = data;
  } else {
    ordersList = data;
    renderOrdersData(localStorageOrders);
  }
};

const renderOrdersData = (data) => {
  let ordersDetails = "";
  for (let i = 0; i < data.length; i++) {
    ordersDetails += `<tr>
  <td class="grey_text">${data[i].id}</td>
  <td class="dark_text">${data[i].customerName}</td>
  <td class="dark_text">${data[i].orderDate}<br>
      <span class="grey_text">${data[i].orderTime}</span>
  </td>
  <td class="grey_text">$${data[i].amount}</td>
  <td class="dark_text">${data[i].orderStatus}</td>
</tr>`;
  }
  $("#order").html(ordersDetails);
  $("#ordersCount").html(data.length);
};

//Checkbox array
$(".orders_checkbox").click(function () {
  var searchIDs = $(".orders_checkbox:checked")
    .map(function () {
      return this.id;
    })
    .get();
  filterOrderBy(searchIDs);
});

const filterOrderBy = (data) => {
  let newOrders = [];
  if (ordersList.length > 0) {
    for (let i = 0; i < data.length; i++) {
      ordersList.filter((item) => {
        if (item.orderStatus == data[i]) {
          newOrders.push(item);
        }
      });
    }
  }

  renderOrdersData(newOrders);
};

const logOutHandler = () => {
  localStorage.setItem("logged", false);
  window.location.assign("/login.html");
};

logOut.addEventListener("click", logOutHandler);

//fetch orders data
fetchOrders("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders");
